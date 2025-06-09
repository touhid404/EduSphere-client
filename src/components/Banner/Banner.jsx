import React from 'react';
import eduImage from '../../assets/sample1.svg'; 
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-24 px-6 mx-4 py-12">
      <div>
        <motion.h1
          className="text-4xl font-extrabold leading-tight"
          animate={{ color: ['#1D4ED8', '#DB2777', '#DC2626', '#1D4ED8'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          Share Your Knowledge<br />on Edusphere
        </motion.h1>

        <p className="max-w-xl  mt-4 text-justify">
          Empower minds by sharing your insights, tutorials, and ideas with a growing community of learners and thinkers. Join Edusphere — where education meets innovation.
        </p>

        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          Learn more
        </button>
      </div>

      <motion.img
        src={eduImage}
        alt="Edusphere Illustration"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="max-w-md w-full rounded-3xl shadow-2xl"
      />
    </div>
  );
};

export default Banner;
