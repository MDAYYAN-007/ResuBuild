import { sql } from '@vercel/postgres';

export async function POST(req) {
  const { resumeIds } = await req.json();

  try {
    
    const insertPromises = resumeIds.map(id =>
      sql`INSERT INTO resumes (id) VALUES (${id}) ON CONFLICT DO NOTHING`
    );
    await Promise.all(insertPromises);

    const { rows } = await sql`SELECT id FROM resumes`;

    return new Response(
      JSON.stringify({ message: 'Resume IDs stored', storedResumeIds: rows }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error storing resume IDs:', error);
    return new Response(JSON.stringify({ error: 'Error storing resume IDs' }), { status: 500 });
  }
}
