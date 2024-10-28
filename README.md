<h1 align="center"> eventbridge | Event Planning Platform</h1>

Welcome to eventbridge, a web-based solution designed to simplify the process of organizing, managing, and hosting events of all sizes and types. The platform will provide users with intuitive tools to plan personal and corporate events, manage guest lists, track RSVPs, send notifications, and coordinate with vendors. The platform aims to enhance the efficiency of event planning, making it easier for individuals, event organizer and businesses to streamline their workflows and deliver successful events.
<br>

<h1>Features 🎯</h1>
<ul>
<li><strong>Event Creation:</strong> Create and customize events with ease.</li>
<li><strong>Registration Management:</strong> Allow attendees to register for events online.</li>
<li><strong>Ticket Booking:</strong> Enable attendees to book tickets for events online.</li>
<li><strong>Email Notifications:</strong> Send automated emails for event registrations and bookings, which are sent directly to attendees' email addresses.</li>
<li><strong>Attendee Tracking:</strong> Keep track of attendees and monitor check-in and check-out times.</li>
<li><strong>Admin Management:</strong> Product managers can add admins that can create and manage events.</li>
</ul>

<h1>Technologies Used</h1>
<ul>
<li><strong>React:</strong> Provides a fast and scalable frontend solution with reusable components.</li>
<li><strong>Node.js & Express:</strong> A lightweight, scalable, and real-time backend, ideal for managing multiple event-related requests.</li>
<li><strong>MongoDB:</strong> A flexible NoSQL database that allows easy management of complex relationships (events, guests, vendors) and scalability for large datasets.</li>
</ul>

<h1>Architecture</h1>
Our eventbridge application is built on a microservice architecture. This allows for scalability, flexibility, and efficient communication between different components of the system. The interactions between client and server take place via API calls, providing a seamless experience for both the organizers and attendees.
<br>
<br>
<h1>🚀 Getting Started (Locally)</h1>

<h3>Download or clone the repository</h3>
<p>You can download the zip file of the repository or use the following command in your terminal to clone the repository:</p>
<pre><code class="language-bash">git clone https://github.com/dene009/Event-Planning-Platform.git</code></pre>
<h3>Navigate to the project's root directory</h3>
<p>Once you have downloaded or cloned the repository, navigate to the project's root directory. The project consists of three folders: client, server, and developer.</p>
<h3>Install dependencies</h3>
<p>Before starting the servers, make sure to install the dependencies by running the command:</p>
<pre><code class="language-bash">npm install</code></pre>
<b>in all three folders: client, server, and developer.</b>
<h3>Set up environment variables</h3>
<p>Before running the servers, you need to set up the following environment variables:</p>
<h4>For the client-side:</h4>
<p>Create a <b>.env.local</b> file in the client folder with the following variables:</p>
<pre><code class="language-php">NEXT_PUBLIC_BASE_URL - the base URL of the API server (e.g. http://localhost:5173)
NEXT_PUBLIC_API_URL - the URL of the API server (e.g. http://localhost:5001)</code></pre>
<h4>For the server-side:</h4>
<p>Create a <b>.env</b> file in the server folder with the following variables:</p>
<pre><code class="language-rust">MONGO_ATLAS_URI - the connection string for your MongoDB Atlas database
JWT_SECRET - the secret key to use for JWT token generation</code></pre>
<h3>Start the servers</h3>
<p>To start the servers, run the following commands:</p>
<p>For the client-side:</p>
<pre><code class="language-arduino">npm run dev</code></pre>
<p>For the server-side:</p>
<pre><code>nodemon index.js</code></pre>
<p>To run the both Server and Database:</p>
<pre><code class="language-arduino">npm run concurrently --save dev</code></pre>
<h4>Note: Make sure to follow the exact steps mentioned above to avoid any errors or issues.</h4>
<br>

<h1>👉 How to use the site</h1>
eventbridge application has three main components:

<ul>
  <li><strong>User:</strong> Users can sign in or sign up and access the user dashboard to view and register for events.</li>
  <li><strong>Admin:</strong> Admins can log in to create events, view their events, and manage registrations for their events.</li>
</ul>

<br>
<h1>👥 Team</h1>

<ul>
  <li><strong>Esidene Abraham Alicha:</strong>  
  
  </a>
  </li>
</ul>
<br>
