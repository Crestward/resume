<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Mockup - Interactive One-Pager</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-track {
            background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
        }

        /* Particle Effect Simulation */
        .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            animation: float 6s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
            50% { transform: translate(var(--tx), var(--ty)) scale(1.5); opacity: 1; }
        }

        /* Gradient Background Animation */
        .gradient-bg {
            background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* Glitch Effect */
        .glitch {
            position: relative;
            animation: glitch 3s infinite;
        }

        @keyframes glitch {
            0%, 90%, 100% { transform: translate(0); }
            92% { transform: translate(-2px, 2px); }
            94% { transform: translate(2px, -2px); }
            96% { transform: translate(-2px, -2px); }
        }

        /* Glassmorphism */
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* 3D Card Tilt Effect */
        .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
        }

        .card-3d:hover {
            transform: rotateX(5deg) rotateY(5deg) scale(1.05);
        }

        /* Floating Animation */
        .float {
            animation: floating 3s ease-in-out infinite;
        }

        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        /* Pulse Animation */
        .pulse-ring {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
        }

        /* Timeline Line */
        .timeline-line {
            background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            height: 4px;
            position: relative;
        }

        .timeline-dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #667eea;
            border: 4px solid #1a1a2e;
            position: absolute;
            top: -8px;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.8);
            animation: pulse 2s ease-in-out infinite;
        }

        /* Skill Node */
        .skill-node {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
            border: 2px solid rgba(102, 126, 234, 0.5);
            backdrop-filter: blur(5px);
            cursor: pointer;
            transition: all 0.3s ease;
            animation: orbit 20s linear infinite;
        }

        .skill-node:hover {
            transform: scale(1.3);
            box-shadow: 0 0 30px rgba(102, 126, 234, 0.8);
            border-color: #667eea;
        }

        @keyframes orbit {
            from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }

        /* Certificate Card Flip */
        .cert-card {
            width: 250px;
            height: 150px;
            perspective: 1000px;
            cursor: pointer;
        }

        .cert-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }

        .cert-card:hover .cert-inner {
            transform: rotateY(180deg);
        }

        .cert-front, .cert-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .cert-back {
            transform: rotateY(180deg);
        }

        /* Scroll Indicator */
        .scroll-indicator {
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
        }

        /* Magnetic Button Effect */
        .magnetic-btn {
            position: relative;
            transition: transform 0.2s ease;
        }

        .magnetic-btn:hover {
            transform: scale(1.05);
        }

        /* Tech Badge */
        .tech-badge {
            display: inline-block;
            padding: 6px 12px;
            background: rgba(102, 126, 234, 0.2);
            border: 1px solid rgba(102, 126, 234, 0.5);
            border-radius: 20px;
            font-size: 12px;
            margin: 4px;
            transition: all 0.3s ease;
        }

        .tech-badge:hover {
            background: rgba(102, 126, 234, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
        }

        /* Avatar Container */
        .avatar-3d {
            width: 200px;
            height: 200px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            position: relative;
            box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
            animation: rotate3d 10s linear infinite;
        }

        @keyframes rotate3d {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
        }

        /* Progress Bar */
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            z-index: 1000;
            transition: width 0.2s ease;
        }

        /* Section Indicator */
        .section-nav {
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 100;
        }

        .nav-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            margin: 15px 0;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .nav-dot.active {
            background: #667eea;
            box-shadow: 0 0 15px rgba(102, 126, 234, 0.8);
            transform: scale(1.3);
        }

        .nav-dot:hover {
            background: #667eea;
            transform: scale(1.2);
        }
    </style>
</head>
<body class="bg-gray-900 text-white">
    <!-- Progress Bar -->
    <div class="progress-bar" id="progressBar" style="width: 0%"></div>

    <!-- Section Navigation -->
    <div class="section-nav">
        <div class="nav-dot active" data-section="0"></div>
        <div class="nav-dot" data-section="1"></div>
        <div class="nav-dot" data-section="2"></div>
        <div class="nav-dot" data-section="3"></div>
        <div class="nav-dot" data-section="4"></div>
        <div class="nav-dot" data-section="5"></div>
    </div>

    <!-- Section 1: HERO -->
    <section class="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden" id="section-0">
        <!-- Particle Background -->
        <div class="absolute inset-0" id="particles"></div>
        
        <div class="text-center z-10 relative">
            <h1 class="text-7xl md:text-9xl font-bold mb-6 glitch">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                    YOUR NAME
                </span>
            </h1>
            <p class="text-2xl md:text-3xl text-gray-300 mb-8 glass inline-block px-8 py-4 rounded-full">
                Creative Developer & 3D Specialist
            </p>
            
            <!-- Floating Tech Icons -->
            <div class="flex justify-center gap-6 mt-12 flex-wrap">
                <div class="glass p-4 rounded-xl float" style="animation-delay: 0s;">
                    <svg class="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                </div>
                <div class="glass p-4 rounded-xl float" style="animation-delay: 0.2s;">
                    <svg class="w-12 h-12 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                </div>
                <div class="glass p-4 rounded-xl float" style="animation-delay: 0.4s;">
                    <svg class="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
                <svg class="w-8 h-8 text-purple-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    </section>

    <!-- Section 2: BIO / ABOUT -->
    <section class="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden" id="section-1">
        <div class="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
            <!-- 3D Avatar Placeholder -->
            <div class="flex justify-center">
                <div class="avatar-3d flex items-center justify-center">
                    <span class="text-6xl">👨‍💻</span>
                </div>
            </div>

            <!-- Bio Text -->
            <div class="space-y-6">
                <h2 class="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    About Me
                </h2>
                <p class="text-xl text-gray-300 leading-relaxed">
                    Passionate developer specializing in creating <span class="text-purple-400 font-semibold">immersive web experiences</span> that push the boundaries of what's possible in the browser.
                </p>
                <p class="text-xl text-gray-300 leading-relaxed">
                    With expertise in <span class="text-blue-400 font-semibold">React, Three.js, and modern web technologies</span>, I transform ideas into interactive digital art that engages and inspires.
                </p>

                <!-- Floating Skills -->
                <div class="flex flex-wrap gap-3 pt-6">
                    <span class="tech-badge text-blue-300">React</span>
                    <span class="tech-badge text-green-300">Three.js</span>
                    <span class="tech-badge text-purple-300">TypeScript</span>
                    <span class="tech-badge text-pink-300">GSAP</span>
                    <span class="tech-badge text-yellow-300">WebGL</span>
                    <span class="tech-badge text-red-300">Next.js</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 3: WORK EXPERIENCE -->
    <section class="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative" id="section-2">
        <div class="max-w-6xl mx-auto px-8">
            <h2 class="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Work Experience
            </h2>

            <!-- Timeline -->
            <div class="relative mb-20">
                <div class="timeline-line mx-auto" style="width: 80%;"></div>
                <div class="timeline-dot" style="left: 10%;"></div>
                <div class="timeline-dot" style="left: 35%;"></div>
                <div class="timeline-dot" style="left: 60%;"></div>
                <div class="timeline-dot" style="left: 85%;"></div>

                <div class="flex justify-around mt-8 text-sm text-gray-400">
                    <span>2020</span>
                    <span>2021</span>
                    <span>2023</span>
                    <span>2025</span>
                </div>
            </div>

            <!-- Project Cards -->
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Card 1 -->
                <div class="glass p-6 rounded-2xl card-3d cursor-pointer">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-purple-400">Senior Frontend Developer</h3>
                            <p class="text-gray-400">TechCorp Inc. • 2023-Present</p>
                        </div>
                        <div class="text-4xl">🚀</div>
                    </div>
                    <p class="text-gray-300 mb-4">
                        Led development of immersive 3D product configurator using Three.js, resulting in 40% increase in user engagement.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge">React</span>
                        <span class="tech-badge">Three.js</span>
                        <span class="tech-badge">WebGL</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-700">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-purple-400">👥 500K+ Users</span>
                            <span class="text-green-400">📈 40% Engagement</span>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="glass p-6 rounded-2xl card-3d cursor-pointer">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-blue-400">Creative Developer</h3>
                            <p class="text-gray-400">Digital Agency • 2021-2023</p>
                        </div>
                        <div class="text-4xl">🎨</div>
                    </div>
                    <p class="text-gray-300 mb-4">
                        Crafted award-winning interactive experiences for major brands, specializing in animation and creative coding.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge">GSAP</span>
                        <span class="tech-badge">Canvas</span>
                        <span class="tech-badge">WebGL</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-700">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-blue-400">🏆 5 Awards</span>
                            <span class="text-yellow-400">⭐ Featured Work</span>
                        </div>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="glass p-6 rounded-2xl card-3d cursor-pointer">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-green-400">Full Stack Developer</h3>
                            <p class="text-gray-400">StartupXYZ • 2020-2021</p>
                        </div>
                        <div class="text-4xl">💡</div>
                    </div>
                    <p class="text-gray-300 mb-4">
                        Built scalable web applications from scratch, implementing modern architecture and best practices.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge">Next.js</span>
                        <span class="tech-badge">Node.js</span>
                        <span class="tech-badge">PostgreSQL</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-700">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-green-400">⚡ 99.9% Uptime</span>
                            <span class="text-purple-400">🔧 Built MVP</span>
                        </div>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="glass p-6 rounded-2xl card-3d cursor-pointer">
                    <div class="flex items-start justify-between mb-4">
                        <div>
                            <h3 class="text-2xl font-bold text-pink-400">Junior Developer</h3>
                            <p class="text-gray-400">Code Studio • 2019-2020</p>
                        </div>
                        <div class="text-4xl">🌱</div>
                    </div>
                    <p class="text-gray-300 mb-4">
                        Started journey in web development, contributing to client projects and learning modern frameworks.
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <span class="tech-badge">JavaScript</span>
                        <span class="tech-badge">React</span>
                        <span class="tech-badge">CSS3</span>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-700">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-pink-400">📚 Fast Learner</span>
                            <span class="text-blue-400">👥 Team Player</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 4: SKILLS MATRIX -->
    <section class="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden" id="section-3">
        <div class="max-w-6xl mx-auto px-8 text-center">
            <h2 class="text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                Skills Constellation
            </h2>
            <p class="text-gray-400 mb-12">Hover over nodes to explore</p>

            <!-- Skills Graph Container -->
            <div class="relative" style="height: 500px;">
                <!-- Central Node -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold z-10 pulse-ring">
                    YOU
                </div>

                <!-- Orbiting Skill Nodes -->
                <div class="skill-node" style="top: 10%; left: 20%; animation-duration: 15s;">
                    <div class="text-center">
                        <div class="text-3xl mb-2">⚛️</div>
                        <div class="text-sm font-semibold">React</div>
                    </div>
                </div>

                <div class="skill-node" style="top: 10%; right: 20%; animation-duration: 18s; animation-direction: reverse;">
                    <div class="text-center">
                        <div class="text-3xl mb-2">🎮</div>
                        <div class="text-sm font-semibold">Three.js</div>
                    </div>
                </div>

                <div class="skill-node" style="bottom: 10%; left: 20%; animation-duration: 20s;">
                    <div class="text-center">
                        <div class="text-3xl mb-2">📘</div>
                        <div class="text-sm font-semibold">TypeScript</div>
                    </div>
                </div>

                <div class="skill-node" style="bottom: 10%; right: 20%; animation-duration: 16s; animation-direction: reverse;">
                    <div class="text-center">
                        <div class="text-3xl mb-2">🎬</div>
                        <div class="text-sm font-semibold">GSAP</div>
                    </div>
                </div>

                <div class="skill-node" style="top: 50%; left: 5%; animation-duration: 22s;">
                    <div class="text-center">
                        <div class="text-3xl mb-2">🎨</div>
                        <div class="text-sm font-semibold">WebGL</div>
                    </div>
                </div>

                <div class="skill-node" style="top: 50%; right: 5%; animation-duration: 19s; animation-direction: reverse;">
                    <div class="text-center">
                        <div class="text-3xl mb-2">⚡</div>
                        <div class="text-sm font-semibold">Next.js</div>
                    </div>
                </div>
            </div>

            <!-- Skill Categories -->
            <div class="grid md:grid-cols-3 gap-6 mt-16">
                <div class="glass p-6 rounded-xl">
                    <h3 class="text-xl font-bold text-blue-400 mb-4">Frontend</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span>React</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-blue-500 to-purple-500" style="width: 95%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>TypeScript</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-blue-500 to-purple-500" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>CSS/Tailwind</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-blue-500 to-purple-500" style="width: 88%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="glass p-6 rounded-xl">
                    <h3 class="text-xl font-bold text-green-400 mb-4">3D & Animation</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span>Three.js</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-green-500 to-teal-500" style="width: 92%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>GSAP</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-green-500 to-teal-500" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>WebGL</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-green-500 to-teal-500" style="width: 85%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="glass p-6 rounded-xl">
                    <h3 class="text-xl font-bold text-purple-400 mb-4">Backend & Tools</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span>Node.js</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500" style="width: 87%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>Git</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500" style="width: 93%"></div>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span>PostgreSQL</span>
                            <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 5: CERTIFICATIONS -->
    <section class="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative" id="section-4">
        <div class="max-w-6xl mx-auto px-8">
            <h2 class="text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
                Certifications & Achievements
            </h2>

            <div class="flex flex-wrap justify-center gap-8">
                <!-- Certificate Cards with Flip Effect -->
                <div class="cert-card">
                    <div class="cert-inner">
                        <div class="cert-front glass flex flex-col items-center justify-center p-6">
                            <div class="text-5xl mb-4">🏆</div>
                            <h3 class="text-xl font-bold text-yellow-400">AWS Certified</h3>
                            <p class="text-sm text-gray-400 mt-2">Solutions Architect</p>
                        </div>
                        <div class="cert-back bg-gradient-to-br from-yellow-500 to-orange-500 flex flex-col items-center justify-center p-6">
                            <p class="text-sm text-center mb-2">Amazon Web Services</p>
                            <p class="font-bold">Valid: 2025</p>
                            <button class="mt-4 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold">
                                Verify →
                            </button>
                        </div>
                    </div>
                </div>

                <div class="cert-card">
                    <div class="cert-inner">
                        <div class="cert-front glass flex flex-col items-center justify-center p-6">
                            <div class="text-5xl mb-4">📜</div>
                            <h3 class="text-xl font-bold text-blue-400">React Expert</h3>
                            <p class="text-sm text-gray-400 mt-2">Meta Certification</p>
                        </div>
                        <div class="cert-back bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col items-center justify-center p-6">
                            <p class="text-sm text-center mb-2">Meta (Facebook)</p>
                            <p class="font-bold">Issued: 2024</p>
                            <button class="mt-4 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold">
                                Verify →
                            </button>
                        </div>
                    </div>
                </div>

                <div class="cert-card">
                    <div class="cert-inner">
                        <div class="cert-front glass flex flex-col items-center justify-center p-6">
                            <div class="text-5xl mb-4">⭐</div>
                            <h3 class="text-xl font-bold text-purple-400">Design Award</h3>
                            <p class="text-sm text-gray-400 mt-2">Awwwards Site</p>
                        </div>
                        <div class="cert-back bg-gradient-to-br from-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
                            <p class="text-sm text-center mb-2">Awwwards</p>
                            <p class="font-bold">Winner 2023</p>
                            <button class="mt-4 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold">
                                View →
                            </button>
                        </div>
                    </div>
                </div>

                <div class="cert-card">
                    <div class="cert-inner">
                        <div class="cert-front glass flex flex-col items-center justify-center p-6">
                            <div class="text-5xl mb-4">🎖️</div>
                            <h3 class="text-xl font-bold text-green-400">WebGL Master</h3>
                            <p class="text-sm text-gray-400 mt-2">Three.js Journey</p>
                        </div>
                        <div class="cert-back bg-gradient-to-br from-green-500 to-teal-500 flex flex-col items-center justify-center p-6">
                            <p class="text-sm text-center mb-2">Three.js Journey</p>
                            <p class="font-bold">Completed 2024</p>
                            <button class="mt-4 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold">
                                Verify →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Achievement Stats -->
            <div class="grid md:grid-cols-4 gap-6 mt-16">
                <div class="glass p-6 rounded-xl text-center">
                    <div class="text-4xl font-bold text-purple-400 mb-2">50+</div>
                    <div class="text-gray-400">Projects Completed</div>
                </div>
                <div class="glass p-6 rounded-xl text-center">
                    <div class="text-4xl font-bold text-blue-400 mb-2">5</div>
                    <div class="text-gray-400">Years Experience</div>
                </div>
                <div class="glass p-6 rounded-xl text-center">
                    <div class="text-4xl font-bold text-green-400 mb-2">15+</div>
                    <div class="text-gray-400">Certifications</div>
                </div>
                <div class="glass p-6 rounded-xl text-center">
                    <div class="text-4xl font-bold text-yellow-400 mb-2">10</div>
                    <div class="text-gray-400">Awards Won</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section 6: CONTACT / RESUME -->
    <section class="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden" id="section-5">
        <div class="max-w-4xl mx-auto px-8 text-center">
            <h2 class="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Let's Build Something Amazing
            </h2>
            <p class="text-xl text-gray-400 mb-12">
                Ready to create the next generation of web experiences?
            </p>

            <!-- 3D Resume Card -->
            <div class="glass p-8 rounded-3xl max-w-md mx-auto mb-12 card-3d">
                <div class="text-6xl mb-6">📄</div>
                <h3 class="text-2xl font-bold mb-4">Download My Resume</h3>
                <p class="text-gray-400 mb-6">Get the complete picture of my experience</p>
                <button class="magnetic-btn px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-lg hover:shadow-2xl transition-all">
                    Download PDF →
                </button>
                <p class="text-sm text-gray-500 mt-4">Last updated: October 2025</p>
            </div>

            <!-- Social Links -->
            <div class="flex justify-center gap-6 mb-8">
                <a href="#" class="glass p-4 rounded-xl hover:scale-110 transition-transform">
                    <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </a>
                <a href="#" class="glass p-4 rounded-xl hover:scale-110 transition-transform">
                    <svg class="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
                <a href="#" class="glass p-4 rounded-xl hover:scale-110 transition-transform">
                    <svg class="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
            </div>

            <!-- Contact Info -->
            <div class="glass inline-block px-8 py-4 rounded-full">
                <a href="mailto:your.email@example.com" class="text-gray-300 hover:text-purple-400 transition-colors">
                    your.email@example.com
                </a>
            </div>

            <!-- Footer -->
            <div class="mt-16 text-gray-500 text-sm">
                <p>© 2025 Your Name. Designed & Developed with ❤️</p>
                <p class="mt-2">Built with React, Next.js, Three.js, GSAP & Tailwind CSS</p>
            </div>
        </div>
    </section>

    <script>
        // Generate particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
            particle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
            particle.style.animationDelay = Math.random() * 6 + 's';
            particlesContainer.appendChild(particle);
        }

        // Scroll progress bar
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            document.getElementById('progressBar').style.width = scrollPercent + '%';

            // Update active section dot
            const sections = document.querySelectorAll('section');
            const navDots = document.querySelectorAll('.nav-dot');
            
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    navDots.forEach(dot => dot.classList.remove('active'));
                    navDots[index].classList.add('active');
                }
            });
        });

        // Section navigation
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const sections = document.querySelectorAll('section');
                sections[index].scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Mouse parallax effect on hero
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            document.querySelectorAll('.float').forEach((el, index) => {
                const speed = (index + 1) * 20;
                el.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px) translateY(-20px)`;
            });
        });
    </script>
</body>
</html>