import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const sessionId = formData.get('session_id')?.toString();
  const fullName = formData.get('full_name')?.toString();
  const phoneNumber = formData.get('phone_number')?.toString();
  const tier = formData.get('tier')?.toString();

  if (!sessionId || !fullName || !phoneNumber || !tier) {
    return new Response('Data tidak lengkap', { status: 400 });
  }

  // Panggil RPC Stored Procedure Supabase
  const { data, error } = await supabase.rpc('register_bluewave_session', {
    p_session_id: sessionId,
    p_full_name: fullName,
    p_phone_number: phoneNumber,
    p_tier: tier,
  });

  if (error || !data.success) {
    return new Response(data?.message || 'Gagal mendaftar', { status: 400 });
  }

  // Redirect kembali ke halaman utama dengan status sukses
  return redirect('/?status=success');
};