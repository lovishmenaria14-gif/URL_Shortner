import { motion } from "framer-motion";
import {
  Code2,
  Rocket,
  Laptop,
  Sparkles,
  ArrowDown,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const skills = [
  "React",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Supabase",
  "Tailwind CSS",
  "Git",
];

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const About = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-hidden relative">

      {/* Animated Background */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-purple-500/10 blur-[120px]"
      />

      {/* Hero Section */}

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
            y: [0, -12, 0],
          }}
          transition={{
            duration: 1,
            y: {
              duration: 3,
              repeat: Infinity,
            },
          }}
          className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-7xl font-extrabold shadow-[0_0_60px_rgba(34,211,238,0.5)]"
        >
          L
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-6xl md:text-8xl font-black mt-10"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_200%] animate-pulse">
            Lovish
          </span>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="max-w-3xl text-gray-400 mt-8 text-xl leading-9"
        >
          Passionate Full Stack Developer who enjoys building beautiful,
          responsive, and scalable web applications. I love turning ideas into
          real-world products using modern technologies.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="flex flex-wrap justify-center gap-5 mt-10"
        >
          <a
            href="https://github.com/lovishmenaria14-gif"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition flex items-center gap-3 font-semibold"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href="linkedin.com/in/lovish-menaria-b6b562316/"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition flex items-center gap-3 font-semibold"
          >
            <FaLinkedin />
            LinkedIn
          </a>

          <a
            href="mailto:lovishbusiness1@gmail.com"
            className="px-7 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition flex items-center gap-3 font-semibold"
          >
            <FaEnvelope />
            Contact
          </a>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="absolute bottom-10"
        >
          <ArrowDown size={40} className="text-cyan-400" />
        </motion.div>
      </section>

      {/* About Me */}

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="grid md:grid-cols-2 gap-8"
        >

          <div className="rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-10">

            <div className="flex items-center gap-4 mb-6">
              <Laptop className="text-cyan-400" size={35} />
              <h2 className="text-3xl font-bold">
                About Me
              </h2>
            </div>

            <p className="text-gray-400 leading-8">
              I'm a self-driven developer who enjoys creating elegant,
              high-performance web applications. My focus is on writing clean,
              maintainable code while delivering an exceptional user experience.
            </p>

            <p className="text-gray-400 leading-8 mt-6">
              Every project I build teaches me something new. Whether it's
              frontend animations, backend APIs, authentication, or databases,
              I love learning by building.
            </p>

          </div>

          <div className="rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-10">

            <div className="flex items-center gap-4 mb-6">
              <Rocket className="text-cyan-400" size={35} />
              <h2 className="text-3xl font-bold">
                My Mission
              </h2>
            </div>

            <p className="text-gray-400 leading-8">
              My goal is to build modern applications that solve real-world
              problems while continuously improving my skills as a software
              developer.
            </p>

            <p className="text-gray-400 leading-8 mt-6">
              I believe technology should be fast, beautiful, accessible, and
              enjoyable to use.
            </p>

          </div>

        </motion.div>

      </section>
            {/* Skills Section */}

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-14">
            <Sparkles className="text-cyan-400" size={35} />
            <h2 className="text-5xl font-black">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 text-center cursor-pointer hover:border-cyan-400 transition-all"
              >
                <Code2
                  size={40}
                  className="mx-auto text-cyan-400 mb-4"
                />

                <h3 className="font-bold text-xl">
                  {skill}
                </h3>
              </motion.div>
            ))}

          </div>
        </motion.div>

      </section>

      {/* Stats */}

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-4 gap-6">

          {[
            {
              number: "15+",
              title: "Projects",
            },
            {
              number: "100%",
              title: "Learning",
            },
            {
              number: "24/7",
              title: "Coding",
            },
            {
              number: "∞",
              title: "Curiosity",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.15,
              }}
              whileHover={{
                scale: 1.05,
              }}
              viewport={{ once: true }}
              className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 p-10 text-center"
            >
              <h2 className="text-5xl font-black text-cyan-400">
                {item.number}
              </h2>

              <p className="text-gray-400 mt-3 text-lg">
                {item.title}
              </p>

            </motion.div>
          ))}

        </div>

      </section>

      {/* Featured Project */}

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-10"
        >

          <div className="flex items-center gap-4 mb-6">
            <Rocket className="text-cyan-400" size={35} />
            <h2 className="text-4xl font-bold">
              Featured Project
            </h2>
          </div>

          <h3 className="text-3xl font-bold mb-5">
            🔗 SnapLink - URL Shortener
          </h3>

          <p className="text-gray-400 leading-8 text-lg">
            A modern URL Shortener built using React, Supabase, Tailwind CSS,
            and React Router. Users can shorten URLs, generate QR codes,
            authenticate securely, manage links through a dashboard, and
            analyze click statistics in one place.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            {[
              "React",
              "Supabase",
              "Tailwind",
              "Authentication",
              "QR Code",
              "Analytics",
            ].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30"
              >
                {tech}
              </span>
            ))}

          </div>

        </motion.div>

      </section>
            {/* Contact Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 p-12 text-center"
        >

          <h2 className="text-5xl font-black mb-6">
            Let's Build Something Amazing 🚀
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-8 mb-10">
            I'm always excited to learn, collaborate, and work on meaningful
            projects. Whether you have an idea, a question, or just want to say
            hello, feel free to reach out.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <motion.a
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              href="mailto:lovishbusiness1@example.com"
              className="px-7 py-3 rounded-xl bg-cyan-500 text-white font-semibold flex items-center gap-3 shadow-lg"
            >
              <FaEnvelope />
              Email Me
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              href="https://github.com/lovishmenaria14-gif"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white font-semibold flex items-center gap-3"
            >
              <FaGithub />
              GitHub
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              href="https://www.linkedin.com/in/lovish-menaria-b6b562316/"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-3"
            >
              <FaLinkedin />
              LinkedIn
            </motion.a>

          </div>

        </motion.div>

      </section>

      {/* Footer */}

      <footer className="relative z-10 mt-20 border-t border-white/10">

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between"
        >

          <div>
            <h2 className="text-2xl font-bold">
              Lovish
            </h2>

            <p className="text-gray-400 mt-2">
              Full Stack Developer • React • Node.js • Supabase
            </p>
          </div>

          <p className="text-gray-500 mt-6 md:mt-0">
            © {new Date().getFullYear()} Lovish. Made with ❤️ using React &
            Tailwind CSS.
          </p>

        </motion.div>

      </footer>

    </div>
  );
};

export default About;