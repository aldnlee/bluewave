import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request, redirect, locals }) => {
  try {
    const formData = await request.formData();
    const sessionId = formData.get('session_id')?.toString();
    const fullName = formData.get('full_name')?.toString();
    const phoneNumber = formData.get('phone_number')?.toString();
    const tier = formData.get('tier')?.toString();

    if (!sessionId || !fullName || !phoneNumber || !tier) {
      return new Response('Data tidak lengkap', { status: 400 });
    }

    // Ambil Env variables dari Cloudflare runtime context/env
    const runtimeEnv = (locals as any)?.runtime?.env || {};
    const supabaseUrl = runtimeEnv.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = runtimeEnv.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response('Konfigurasi database belum siap', { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Panggil RPC Stored Procedure Supabase
    const { data, error } = await supabase.rpc('register_bluewave_session', {
      p_session_id: sessionId,
      p_full_name: fullName,
      p_phone_number: phoneNumber,
      p_tier: tier,
    });

    if (error || !data?.success) {
      return new Response(data?.message || error?.message || 'Gagal mendaftar', { status: 400 });
    }

    // Gunakan HTTP 303 See Other agar browser melakukan GET setelah Form POST
    return redirect('/?status=success', 303);
  } catch (err: any) {
    return new Response(`Server Error: ${err?.message || 'Terjadi kesalahan'}`, { status: 500 });
  }
};