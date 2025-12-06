'use client';

import { useRef, useState } from 'react';
import styles from './SequenceJourney.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { temas } from '@/data/temas';

// Animation variants for the steps
const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

// Utility to render steps inside the component to access state
const StepItem = ({ step, onImageClick }) => {
  const content = () => {
    switch (step.tipo) {
      case 'titulo':
        return <h1 className={styles.stepContent}>{step.texto}</h1>;
      case 'subtitulo':
        return <h4 className={styles.stepContent}>{step.texto}</h4>;
      case 'parrafo':
        return <p className={styles.stepContent}>{step.texto}</p>;
      case 'imagen':
        return (
          <div className={styles.imageContainer} onClick={() => onImageClick(step)}>
            <Image
              src={step.src}
              alt={step.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
            <div className={styles.expandHint}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              <span>Ampliar</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={styles.step}
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {content()}
    </motion.div>
  );
};

export default function SequenceJourney({ secuencia, currentSlug }) {
  const journeyRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: journeyRef });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Parallax effect: background moves slower than the content
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const handleImageClick = (step) => {
    setSelectedImage(step);
    setIsZoomed(false); // Reset zoom
  };

  const closeFilter = (e) => {
    // Close if clicking overlay or close button
    setSelectedImage(null);
  }

  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  }

  return (
    <>
      <div ref={journeyRef} className={styles.journeyContainer}>
        {/* Animated Background for Parallax */}
        <motion.div
          className={styles.parallaxBackground}
          style={{ y: backgroundY, opacity: backgroundOpacity }}
        />

        <div className={styles.journey}>
          {secuencia.map((step, index) => (
            <StepItem key={index} step={step} onImageClick={handleImageClick} />
          ))}

          {/* Share Section */}
          <motion.div
            className={styles.shareSection}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>¿Te ha inspirado?</h3>
            <p>Comparte este mensaje y ayuda a alguien más a encontrar su camino hoy.</p>

            <div className={styles.shareButtons}>
              <button
                className={`${styles.shareButton} ${styles.shareWhatsapp}`}
                onClick={() => {
                  const url = window.location.href;
                  const text = `Estoy aprendiendo conceptos espirituales a través de imágenes en Espiritualia, hoy estoy aprendiendo esto: ${url}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
              >
                WhatsApp
              </button>

              <button
                className={`${styles.shareButton} ${styles.shareFacebook}`}
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                }}
              >
                Facebook
              </button>

              <button
                className={`${styles.shareButton} ${styles.shareCopy}`}
                onClick={() => {
                  const url = window.location.href;
                  const text = `Estoy aprendiendo conceptos espirituales a través de imágenes en Espiritualia, hoy estoy aprendiendo esto: ${url}`;
                  navigator.clipboard.writeText(text);
                  alert('Mensaje y enlace copiados al portapapeles');
                }}
              >
                Copiar Enlace
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeFilter}>
          <button className={styles.closeButton}>×</button>
          <div
            className={isZoomed ? styles.modalContentZoomed : styles.modalContent}
            onClick={toggleZoom}
          >
            {/* We use a regular img tag here for simplicity in controlling dimensions dynamically without Next.js Image strictness, or use next/image with unoptimized */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={isZoomed ? styles.modalImageFull : styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
}
