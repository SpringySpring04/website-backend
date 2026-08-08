
Deno.serve(async (req) => {
    const url = new URL(req.url);
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
    if (req.method === "OPTIONS") {
        return new Response(null, { headers });
    }
    if (req.method === "POST" && url.pathname === "/submit-ticket") {
        try {
            const formData = await req.formData();
            let ticketContent = `New Ticket (${new Date().toISOString()}):\n`;
            for (const [key, value] of formData.entries()) {
                ticketContent += `${key}: ${value}\n`;
            }
            ticketContent += "-------------------\n"; 
            await Deno.writeTextFile("tickets.txt", ticketContent, { append: true });
            return new Response("Ticket submitted successfully!", { status: 200 });
        } catch (error) {
            return new Response("Error saving ticket.", { status: 500 });
        }
    }
    return new Response("Not Found", { status: 404 });
})
