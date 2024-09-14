const { sql } = require('@vercel/postgres');

export async function POST(req) {
  try {
    const { resumeIds } = await req.json();

    const insertPromises = resumeIds.map(id =>
      sql`INSERT INTO resumes (id) VALUES (${id}) ON CONFLICT DO NOTHING`
    );
    await Promise.all(insertPromises);

    const { rows } = await sql`SELECT id FROM resumes`;

    return new Response(
      JSON.stringify({ message: 'Resume IDs stored', storedResumeIds: rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error storing resume IDs:', error);
    return new Response(
      JSON.stringify({ error: 'Error storing resume IDs' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
