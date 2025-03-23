import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Lightbulb, Brain, Activity, ClipboardList, Users, AlertCircle, CheckCircle, GitBranch } from 'lucide-react';

// Pure CSS styles
const styles = {
  // Main container
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    overflow: 'hidden'
  },
  
  // Navigation bar
  navbar: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navbarTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    margin: 0
  },
  slideCounter: {
    fontSize: '0.875rem'
  },
  
  // Slide container
  slideContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  
  // Navigation controls
  controls: {
    backgroundColor: '#f3f4f6',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#2563eb',
    color: 'white',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
    color: '#6b7280',
    cursor: 'not-allowed'
  },
  
  // Title slide
  titleSlide: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #1e40af, #3b82f6)',
    color: 'white',
    padding: '32px'
  },
  titleContent: {
    textAlign: 'center',
    maxWidth: '48rem',
    animation: 'fadeIn 1s ease-in-out'
  },
  titleMain: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '24px'
  },
  titleSub: {
    fontSize: '1.875rem',
    marginBottom: '32px'
  },
  titleDesc: {
    fontSize: '1.25rem',
    marginBottom: '48px'
  },
  titleFooter: {
    marginTop: '64px',
    borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    paddingTop: '24px',
    opacity: 0.8
  },
  
  // Content slides
  contentSlide: {
    flexGrow: 1,
    display: 'flex',
    padding: '48px',
    backgroundColor: 'white',
    overflow: 'auto'
  },
  contentContainer: {
    width: '100%',
    maxWidth: '64rem',
    margin: '0 auto'
  },
  slideTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: '32px'
  },
  
  // Summary slide
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px'
  },
  summaryBox: {
    backgroundColor: '#eff6ff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
    cursor: 'default'
  },
  
  // Section headers
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px'
  },
  iconContainer: {
    backgroundColor: '#eff6ff',
    padding: '16px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginLeft: '16px'
  },
  
  // Information box
  infoBox: {
    backgroundColor: '#f9fafb',
    padding: '24px',
    borderRadius: '8px',
    marginBottom: '32px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  
  // Grid layouts
  grid2Cols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px'
  },
  grid3Cols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px'
  },
  
  // Feature boxes
  featureBox: {
    backgroundColor: '#eff6ff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
    height: '100%'
  },
  featureHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  featureIconContainer: {
    backgroundColor: '#2563eb',
    padding: '16px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  featureTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '12px',
    color: '#1e40af'
  },
  featureDivider: {
    borderTop: '1px solid #dbeafe',
    paddingTop: '16px'
  },
  
  // Numbered steps
  step: {
    display: 'flex',
    marginBottom: '24px'
  },
  stepNumber: {
    flexShrink: 0,
    width: '32px',
    height: '32px',
    backgroundColor: '#2563eb',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  stepContent: {
    marginLeft: '16px',
    backgroundColor: '#f9fafb',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    flexGrow: 1
  },
  stepTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1e40af'
  },
  
  // Lists
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginTop: '8px'
  },
  listItem: {
    marginBottom: '8px'
  },
  orderedList: {
    listStyleType: 'decimal',
    paddingLeft: '20px',
    lineHeight: '1.6'
  },
  orderedListItem: {
    fontSize: '1.125rem',
    marginBottom: '16px'
  },
  
  // Checkitem style
  checkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  checkIcon: {
    backgroundColor: '#dbeafe',
    borderRadius: '50%',
    padding: '4px',
    marginTop: '4px',
    marginRight: '12px',
    flexShrink: 0
  },
  
  // Advantage/Limitation boxes
  advantagesBox: {
    backgroundColor: '#f0fdf4',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  advantagesHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  advantagesIconContainer: {
    backgroundColor: '#dcfce7',
    padding: '8px',
    borderRadius: '50%'
  },
  advantagesTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginLeft: '12px',
    color: '#16a34a'
  },
  limitationsBox: {
    backgroundColor: '#fef2f2',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  limitationsHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  },
  limitationsIconContainer: {
    backgroundColor: '#fee2e2',
    padding: '8px',
    borderRadius: '50%'
  },
  limitationsTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginLeft: '12px',
    color: '#dc2626'
  },
  
  // Questions slide
  questionsSlide: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #1e40af, #3b82f6)',
    color: 'white',
    padding: '32px'
  },
  questionsTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '32px'
  },
  questionsText: {
    fontSize: '1.5rem',
    marginBottom: '48px'
  },
  
  // Utility classes
  textCenter: { textAlign: 'center' },
  textBold: { fontWeight: 'bold' },
  mb4: { marginBottom: '16px' },
  mb6: { marginBottom: '24px' },
  mb8: { marginBottom: '32px' },
  mt4: { marginTop: '16px' },
  mt6: { marginTop: '24px' },
  p4: { padding: '16px' },
  borderTop: { borderTop: '1px solid #e5e7eb', paddingTop: '16px' }
};

const KODPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const slides = [
    // Slide 1: Page de titre
    <TitleSlide key="slide-1" />,
    
    // Slide 2: Sommaire
    <SummarySlide key="slide-2" />,
    
    // Slide 3: Introduction
    <IntroductionSlide key="slide-3" />,
    
    // Slide 4: Origine et développement
    <OriginSlide key="slide-4" />,
    
    // Slide 5: Principes fondamentaux
    <PrinciplesSlide key="slide-5" />,
    
    // Slide 6: Les 3 paradigmes
    <ParadigmsSlide key="slide-6" />,
    
    // Slide 7: Étapes de la méthode
    <StepsSlide key="slide-7" />,
    
    // Slide 8: Connaissances tacites vs explicites
    <KnowledgeTypesSlide key="slide-8" />,
    
    // Slide 9: Cas d'étude - Introduction
    <CaseStudyIntroSlide key="slide-9" />,
    
    // Slide 10: Cas d'étude - Phase 1 et 2
    <CaseStudyPhase12Slide key="slide-10" />,
    
    // Slide 11: Cas d'étude - Phase 3 et 4
    <CaseStudyPhase34Slide key="slide-11" />,
    
    // Slide 12: Avantages et limites
    <AdvantagesLimitsSlide key="slide-12" />,
    
    // Slide 13: Conclusion
    <ConclusionSlide key="slide-13" />,
    
    // Slide 14: Questions
    <QuestionsSlide key="slide-14" />
  ];

  return (
    <div style={styles.container}>
      {/* Barre de navigation */}
      <div style={styles.navbar}>
        <h2 style={styles.navbarTitle}>Méthode KOD (Knowledge Oriented Design)</h2>
        <div style={styles.slideCounter}>
          Slide {currentSlide + 1} / {slides.length}
        </div>
      </div>
      
      {/* Contenu du slide */}
      <div style={styles.slideContainer}>
        {slides[currentSlide]}
      </div>
      
      {/* Contrôles de navigation */}
      <div style={styles.controls}>
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          style={currentSlide === 0 ? {...styles.button, ...styles.buttonDisabled} : styles.button}
        >
          <ChevronLeft style={{ marginRight: '8px' }} size={20} />
          Précédent
        </button>
        
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          style={currentSlide === slides.length - 1 ? {...styles.button, ...styles.buttonDisabled} : styles.button}
        >
          Suivant
          <ChevronRight style={{ marginLeft: '8px' }} size={20} />
        </button>
      </div>
    </div>
  );
};

// Slides individuels
const TitleSlide = () => (
  <div style={styles.titleSlide}>
    <div style={styles.titleContent}>
      <h1 style={styles.titleMain}>La méthode KOD</h1>
      <h2 style={styles.titleSub}>Knowledge Oriented Design</h2>
      <p style={styles.titleDesc}>Une approche d'ingénierie des connaissances pour les systèmes d'aide à la décision</p>
      
      {/* Section pour les noms des membres du groupe */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '8px',
        backdropFilter: 'blur(5px)',
      }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Présenté par :</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <div style={{ 
            padding: '8px 16px', 
            borderBottom: '2px solid white',
            minWidth: '200px',
            textAlign: 'center',
            fontSize: '1.125rem'
          }}>
            Yanis Yahia Ouahmed
          </div>
          <div style={{ 
            padding: '8px 16px', 
            borderBottom: '2px solid white',
            minWidth: '200px',
            textAlign: 'center',
            fontSize: '1.125rem'
          }}>
            Mohamed Tbahriti
          </div>
        </div>
      </div>
      
      <div style={styles.titleFooter}>
        <p>Master 1 IA - Systèmes d'Aide à la Décision</p>
        <p style={styles.mt4}>Mars 2025</p>
      </div>
    </div>
  </div>
);

const SummarySlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>Sommaire</h2>
      
      <div style={styles.summaryGrid}>
        <div style={styles.summaryBox}>
          <ol style={styles.orderedList}>
            <li style={styles.orderedListItem}>Introduction à KOD</li>
            <li style={styles.orderedListItem}>Origine et développement</li>
            <li style={styles.orderedListItem}>Principes fondamentaux</li>
            <li style={styles.orderedListItem}>Méthodologie KOD : les 3 paradigmes</li>
            <li style={styles.orderedListItem}>Les étapes de la méthode KOD</li>
          </ol>
        </div>
        
        <div style={styles.summaryBox}>
          <ol style={{...styles.orderedList, counterReset: 'list-counter 5'}}>
            <li style={styles.orderedListItem}>Connaissances tacites vs explicites</li>
            <li style={styles.orderedListItem}>Cas d'étude concret</li>
            <li style={styles.orderedListItem}>Avantages et limites</li>
            <li style={styles.orderedListItem}>Conclusion</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
);

const IntroductionSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>1. Introduction à KOD</h2>
      
      <div style={styles.sectionHeader}>
        <div style={styles.iconContainer}>
          <BookOpen size={40} style={{ color: '#1e40af' }} />
        </div>
        <h3 style={styles.sectionTitle}>Qu'est-ce que KOD ?</h3>
      </div>
      
      <div style={styles.infoBox}>
        <p style={{ fontSize: '1.125rem', marginBottom: '16px' }}>
          <span style={styles.textBold}>KOD (Knowledge Oriented Design)</span> est une méthodologie 
          d'acquisition et de modélisation des connaissances développée pour concevoir 
          des systèmes à base de connaissances.
        </p>
        
        <p style={{ fontSize: '1.125rem', marginBottom: '16px' }}>
          <span style={styles.textBold}>Objectif principal :</span> Permettre de passer des connaissances 
          d'experts (souvent implicites) à un modèle formel exploitable par un système informatique.
        </p>
        
        <p style={{ fontSize: '1.125rem' }}>
          KOD s'inscrit dans le domaine de <span style={styles.textBold}>l'ingénierie des connaissances</span> et 
          sert de pont entre l'expertise humaine et les systèmes d'aide à la décision.
        </p>
      </div>
    </div>
  </div>
);

const OriginSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>2. Origine et développement</h2>
      
      <div style={styles.grid2Cols}>
        <div style={styles.infoBox}>
          <div style={{...styles.sectionHeader, marginBottom: '24px'}}>
            <div style={styles.iconContainer}>
              <Users size={30} style={{ color: '#1e40af' }} />
            </div>
            <h3 style={styles.sectionTitle}>Création</h3>
          </div>
          
          <div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Développée par <strong>Claude Vogel</strong> dans les années 1980</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Initialement créée chez <strong>Cisi Ingénierie</strong> (France)</span>
            </div>
          </div>
        </div>
        
        <div style={styles.infoBox}>
          <div style={{...styles.sectionHeader, marginBottom: '24px'}}>
            <div style={styles.iconContainer}>
              <Lightbulb size={30} style={{ color: '#1e40af' }} />
            </div>
            <h3 style={styles.sectionTitle}>Influences et applications</h3>
          </div>
          
          <div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Utilisée dans plusieurs projets industriels (aéronautique, médecine, industrie)</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>S'inspire de disciplines comme l'anthropologie, la linguistique et la psychologie cognitive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PrinciplesSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>3. Principes fondamentaux</h2>
      
      <p style={{ fontSize: '1.125rem', marginBottom: '24px' }}>KOD repose sur trois principes essentiels :</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{
          ...styles.featureBox,
          transition: 'transform 0.3s, box-shadow 0.3s',
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
          }
        }}>
          <h3 style={{...styles.featureTitle, textAlign: 'left', color: '#1e40af', fontSize: '1.25rem'}}>
            1. Principe de modélisation
          </h3>
          <p style={{ fontSize: '1.125rem' }}>
            Les connaissances peuvent être représentées sous forme de modèles conceptuels
          </p>
        </div>
        
        <div style={{
          ...styles.featureBox,
          transition: 'transform 0.3s, box-shadow 0.3s',
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
          }
        }}>
          <h3 style={{...styles.featureTitle, textAlign: 'left', color: '#1e40af', fontSize: '1.25rem'}}>
            2. Principe d'expression naturelle
          </h3>
          <p style={{ fontSize: '1.125rem' }}>
            Les experts doivent exprimer leurs connaissances dans leur langage naturel
          </p>
        </div>
        
        <div style={{
          ...styles.featureBox,
          transition: 'transform 0.3s, box-shadow 0.3s',
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
          }
        }}>
          <h3 style={{...styles.featureTitle, textAlign: 'left', color: '#1e40af', fontSize: '1.25rem'}}>
            3. Principe de validation par consensus
          </h3>
          <p style={{ fontSize: '1.125rem' }}>
            Les modèles doivent être validés par les experts eux-mêmes
          </p>
        </div>
      </div>
      
      <p style={{ fontSize: '1.125rem', marginTop: '24px', fontStyle: 'italic', color: '#4b5563' }}>
        Ces principes assurent que les connaissances capturées sont fidèles à l'expertise réelle.
      </p>
    </div>
  </div>
);

const ParadigmsSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>4. Méthodologie KOD : les 3 paradigmes</h2>
      
      <div style={styles.grid3Cols}>
        <div style={styles.featureBox}>
          <div style={styles.featureHeader}>
            <div style={styles.featureIconContainer}>
              <Brain size={40} style={{ color: 'white' }} />
            </div>
          </div>
          <h3 style={styles.featureTitle}>REPRÉSENTATION</h3>
          <div style={styles.featureDivider}>
            <p style={{...styles.mb4, fontWeight: 'bold'}}>Le "QUOI"</p>
            <ul style={{...styles.list, paddingLeft: '16px'}}>
              <li style={styles.listItem}>Comment l'expert se représente son domaine</li>
              <li style={styles.listItem}>Structure des concepts et leurs relations</li>
              <li style={styles.listItem}>Taxinomies et classifications</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.featureBox}>
          <div style={styles.featureHeader}>
            <div style={styles.featureIconContainer}>
              <Activity size={40} style={{ color: 'white' }} />
            </div>
          </div>
          <h3 style={styles.featureTitle}>ACTION</h3>
          <div style={styles.featureDivider}>
            <p style={{...styles.mb4, fontWeight: 'bold'}}>Le "COMMENT"</p>
            <ul style={{...styles.list, paddingLeft: '16px'}}>
              <li style={styles.listItem}>Comment l'expert agit sur son domaine</li>
              <li style={styles.listItem}>Procédures, méthodes, règles d'intervention</li>
              <li style={styles.listItem}>Comportements et actions</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.featureBox}>
          <div style={styles.featureHeader}>
            <div style={styles.featureIconContainer}>
              <Lightbulb size={40} style={{ color: 'white' }} />
            </div>
          </div>
          <h3 style={styles.featureTitle}>INTERPRÉTATION</h3>
          <div style={styles.featureDivider}>
            <p style={{...styles.mb4, fontWeight: 'bold'}}>Le "POURQUOI"</p>
            <ul style={{...styles.list, paddingLeft: '16px'}}>
              <li style={styles.listItem}>Comment l'expert interprète les situations</li>
              <li style={styles.listItem}>Raisonnements, inférences, décisions</li>
              <li style={styles.listItem}>Stratégies et causalités</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StepsSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>5. Les étapes de la méthode KOD</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={styles.step}>
          <div style={styles.stepNumber}>1</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Acquisition des connaissances</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Entretiens avec les experts</li>
              <li style={styles.listItem}>Observations sur le terrain</li>
              <li style={styles.listItem}>Analyse de documents existants</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.step}>
          <div style={styles.stepNumber}>2</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Modélisation pratique</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Identification des objets, actions et inférences</li>
              <li style={styles.listItem}>Classification et structuration des éléments recueillis</li>
              <li style={styles.listItem}>Création de taxonomies et d'actinomies</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.step}>
          <div style={styles.stepNumber}>3</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Modélisation cognitive</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Formalisation des connaissances</li>
              <li style={styles.listItem}>Construction des modèles conceptuels</li>
              <li style={styles.listItem}>Validation par les experts</li>
            </ul>
          </div>
        </div>
        
        <div style={styles.step}>
          <div style={styles.stepNumber}>4</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Modélisation informatique</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}>Transformation en modèles computationnels</li>
              <li style={styles.listItem}>Implémentation dans le système informatique</li>
              <li style={styles.listItem}>Tests et validation du système</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const KnowledgeTypesSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>6. Connaissances tacites vs explicites dans KOD</h2>
      
      <div style={{...styles.grid2Cols, marginBottom: '32px'}}>
        <div style={styles.featureBox}>
          <h3 style={{...styles.featureTitle, textAlign: 'left'}}>Connaissances explicites</h3>
          <div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Formalisées, documentées, facilement transmissibles</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Exemple : procédures écrites, manuels, règles formelles</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Facilement intégrables dans les modèles KOD</span>
            </div>
          </div>
        </div>
        
        <div style={styles.featureBox}>
          <h3 style={{...styles.featureTitle, textAlign: 'left'}}>Connaissances tacites</h3>
          <div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Intuitives, non-formalisées, difficiles à exprimer</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Exemple : savoir-faire, intuition, expérience personnelle</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span><strong>Défi majeur de KOD</strong> : faire émerger ces connaissances tacites</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.infoBox}>
        <h3 style={{...styles.featureTitle, textAlign: 'left', marginBottom: '16px'}}>
          Stratégies KOD pour capturer les connaissances tacites
        </h3>
        <div style={styles.grid3Cols}>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <Users size={24} style={{ color: '#2563eb' }} />
            </div>
            <p>Observation des experts en situation réelle</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <ClipboardList size={24} style={{ color: '#2563eb' }} />
            </div>
            <p>Techniques d'entretien spécifiques</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <GitBranch size={24} style={{ color: '#2563eb' }} />
            </div>
            <p>Confrontation entre experts</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CaseStudyIntroSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>7. Cas d'étude concret</h2>
      
      <div style={{
        backgroundColor: '#2563eb',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 6px 12px rgba(37, 99, 235, 0.3)',
        color: 'white',
        marginBottom: '32px'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}>Système d'aide au diagnostic médical</h3>
        <p style={{ fontSize: '1.125rem' }}>
          Développement d'un système d'aide au diagnostic pour les maladies respiratoires chroniques
        </p>
      </div>
      
      <div style={styles.infoBox}>
        <h3 style={{...styles.featureTitle, textAlign: 'left', marginBottom: '16px'}}>
          Contexte du projet
        </h3>
        
        <div style={{...styles.grid3Cols, marginBottom: '16px'}}>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#1e40af',
              marginBottom: '8px'
            }}>5</div>
            <p>Pneumologues experts</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#1e40af',
              marginBottom: '8px'
            }}>20</div>
            <p>Consultations observées</p>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#1e40af',
              marginBottom: '8px'
            }}>50</div>
            <p>Dossiers médicaux analysés</p>
          </div>
        </div>
        
        <p style={{ fontSize: '1.125rem' }}>
          L'objectif était de capturer l'expertise des pneumologues pour créer un système capable d'aider au diagnostic 
          des maladies respiratoires chroniques, en particulier dans les cas complexes ou atypiques.
        </p>
      </div>
    </div>
  </div>
);

const CaseStudyPhase12Slide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>Cas d'étude : Phase 1 & 2</h2>
      
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            marginRight: '16px'
          }}>1</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1e40af'
          }}>Phase d'acquisition des connaissances</h3>
        </div>
        <div style={{ paddingLeft: '56px' }}>
          <ul style={styles.list}>
            <li style={styles.listItem}>Entretiens semi-directifs avec les pneumologues</li>
            <li style={styles.listItem}>Observation passive lors des consultations</li>
            <li style={styles.listItem}>Analyse des dossiers et des protocoles existants</li>
            <li style={styles.listItem}>Enregistrement et transcription des "raisonnements à voix haute"</li>
          </ul>
        </div>
      </div>
      
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#2563eb',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            marginRight: '16px'
          }}>2</div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1e40af'
          }}>Phase de modélisation pratique</h3>
        </div>
        <div style={{ paddingLeft: '56px' }}>
          <div style={styles.grid3Cols}>
            <div style={styles.featureBox}>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                textAlign: 'center',
                color: '#1e40af'
              }}>REPRÉSENTATION</h4>
              <ul style={styles.list}>
                <li style={styles.listItem}>Taxonomie des symptômes respiratoires</li>
                <li style={styles.listItem}>Classification des pathologies</li>
                <li style={styles.listItem}>Hiérarchisation des facteurs de risque</li>
              </ul>
            </div>
            
            <div style={styles.featureBox}>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                textAlign: 'center',
                color: '#1e40af'
              }}>ACTION</h4>
              <ul style={styles.list}>
                <li style={styles.listItem}>Protocoles d'examen clinique</li>
                <li style={styles.listItem}>Séquences de tests diagnostiques</li>
                <li style={styles.listItem}>Arbres de décision pour les traitements</li>
              </ul>
            </div>
            
            <div style={styles.featureBox}>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                textAlign: 'center',
                color: '#1e40af'
              }}>INTERPRÉTATION</h4>
              <ul style={styles.list}>
                <li style={styles.listItem}>Règles d'inférence diagnostique</li>
                <li style={styles.listItem}>Logique de priorisation des hypothèses</li>
                <li style={styles.listItem}>Stratégies pour les cas atypiques</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CaseStudyPhase34Slide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>Cas d'étude : Phase 3, 4 & Résultats</h2>
      
      <div style={styles.grid2Cols}>
        <div style={styles.infoBox}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '12px'
            }}>3</div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#1e40af'
            }}>Phase de modélisation cognitive</h3>
          </div>
          <ul style={{...styles.list, paddingLeft: '24px'}}>
            <li style={styles.listItem}>Construction d'un modèle unifié</li>
            <li style={styles.listItem}>Validation itérative avec les experts</li>
            <li style={styles.listItem}>Ajustements basés sur les cas cliniques réels</li>
            <li style={styles.listItem}>Formalisation des interactions entre symptômes</li>
          </ul>
        </div>
        
        <div style={styles.infoBox}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '12px'
            }}>4</div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#1e40af'
            }}>Phase d'implémentation</h3>
          </div>
          <ul style={{...styles.list, paddingLeft: '24px'}}>
            <li style={styles.listItem}>Développement d'une interface adaptée</li>
            <li style={styles.listItem}>Intégration dans le système d'information</li>
            <li style={styles.listItem}>Évaluation des performances (précision)</li>
            <li style={styles.listItem}>Formation des utilisateurs finaux</li>
          </ul>
        </div>
      </div>
      
      <div style={{
        backgroundColor: '#2563eb',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 6px 12px rgba(37, 99, 235, 0.3)',
        color: 'white',
        marginTop: '32px'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '16px',
          textAlign: 'center'
        }}>Résultats obtenus</h3>
        
        <div style={styles.grid3Cols}>
          <div style={{
            backgroundColor: 'white',
            color: '#1e40af',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '8px'
            }}>+25%</div>
            <p>Amélioration du temps de diagnostic</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            color: '#1e40af',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '8px'
            }}>-30%</div>
            <p>Réduction des examens inutiles</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            color: '#1e40af',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              marginBottom: '8px'
            }}>92%</div>
            <p>Taux de satisfaction des médecins</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdvantagesLimitsSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>8. Avantages et limites de KOD</h2>
      
      <div style={styles.grid2Cols}>
        <div>
          <div style={styles.advantagesHeader}>
            <div style={styles.advantagesIconContainer}>
              <CheckCircle size={30} style={{ color: '#16a34a' }} />
            </div>
            <h3 style={styles.advantagesTitle}>Avantages</h3>
          </div>
          
          <div style={styles.advantagesBox}>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <CheckCircle size={16} style={{ color: '#16a34a' }} />
              </div>
              <span>Approche structurée et méthodique</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <CheckCircle size={16} style={{ color: '#16a34a' }} />
              </div>
              <span>Prise en compte des connaissances tacites</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <CheckCircle size={16} style={{ color: '#16a34a' }} />
              </div>
              <span>Validation continue par les experts</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <CheckCircle size={16} style={{ color: '#16a34a' }} />
              </div>
              <span>Modèles intelligibles et maintenables</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <CheckCircle size={16} style={{ color: '#16a34a' }} />
              </div>
              <span>Approche pluridisciplinaire</span>
            </div>
          </div>
        </div>
        
        <div>
          <div style={styles.limitationsHeader}>
            <div style={styles.limitationsIconContainer}>
              <AlertCircle size={30} style={{ color: '#dc2626' }} />
            </div>
            <h3 style={styles.limitationsTitle}>Limites</h3>
          </div>
          
          <div style={styles.limitationsBox}>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#fee2e2',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <AlertCircle size={16} style={{ color: '#dc2626' }} />
              </div>
              <span>Processus chronophage</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#fee2e2',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <AlertCircle size={16} style={{ color: '#dc2626' }} />
              </div>
              <span>Dépendance à la disponibilité des experts</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#fee2e2',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <AlertCircle size={16} style={{ color: '#dc2626' }} />
              </div>
              <span>Difficulté à capturer certains types de connaissances tacites</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#fee2e2',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <AlertCircle size={16} style={{ color: '#dc2626' }} />
              </div>
              <span>Complexité de modélisation dans certains domaines</span>
            </div>
            <div style={styles.checkItem}>
              <div style={{
                backgroundColor: '#fee2e2',
                borderRadius: '50%',
                padding: '4px',
                marginTop: '4px',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <AlertCircle size={16} style={{ color: '#dc2626' }} />
              </div>
              <span>Nécessite des compétences spécifiques en ingénierie des connaissances</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ConclusionSlide = () => (
  <div style={styles.contentSlide}>
    <div style={styles.contentContainer}>
      <h2 style={styles.slideTitle}>9. Conclusion</h2>
      
      <div style={styles.grid2Cols}>
        <div style={styles.featureBox}>
          <h3 style={{...styles.featureTitle, textAlign: 'left'}}>Points clés à retenir</h3>
          
          <div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>KOD offre un cadre méthodologique pour transformer les connaissances expertes en systèmes informatiques</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Les trois paradigmes (représentation, action, interprétation) permettent de couvrir l'ensemble des dimensions du savoir</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>L'équilibre entre connaissances tacites et explicites est au cœur de la démarche KOD</span>
            </div>
          </div>
        </div>
        
        <div style={styles.featureBox}>
          <h3 style={{...styles.featureTitle, textAlign: 'left'}}>Perspectives actuelles</h3>
          
          <div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Intégration avec les approches d'intelligence artificielle moderne</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Application dans des domaines émergents (IoT, médecine personnalisée)</span>
            </div>
            <div style={styles.checkItem}>
              <div style={styles.checkIcon}>
                <CheckCircle size={16} style={{ color: '#1e40af' }} />
              </div>
              <span>Évolution vers des méthodologies hybrides combinant KOD et apprentissage automatique</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const QuestionsSlide = () => (
  <div style={styles.questionsSlide}>
    <div style={{textAlign: 'center', maxWidth: '32rem'}}>
      <h1 style={styles.questionsTitle}>Questions ?</h1>
      <p style={styles.questionsText}>Merci pour votre attention !</p>
    </div>
  </div>
);

export default KODPresentation;


