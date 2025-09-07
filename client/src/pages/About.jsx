import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  px-6 py-12">
      <div className="max-w-3xl shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-center  mb-6">
          About <span className="text-teal-600">IdeaHive</span>
        </h1>
        <p className=" text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-teal-600">IdeaHive</span> – 
          a space where creativity, knowledge, and community come together. 
          We believe every idea has the power to spark change. 
          Whether it’s technology, lifestyle, personal growth, or creative storytelling, 
          our blog is a hive buzzing with fresh perspectives and meaningful conversations.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Our mission is simple:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>📝 <span className="font-semibold">Inspire</span> readers with thought-provoking articles</li>
          <li>💡 <span className="font-semibold">Share</span> practical insights and experiences</li>
          <li>🌍 <span className="font-semibold">Connect</span> people through diverse voices and stories</li>
        </ul>
        <p className=" text-lg leading-relaxed">
          We’re not just another blog — we’re a community of thinkers, learners, 
          and creators who believe in the exchange of ideas that matter. 
          So dive in, explore, and be part of the hive. 
          Because every idea deserves to be heard. ✨
        </p>
      </div>
    </div>
  );
}

