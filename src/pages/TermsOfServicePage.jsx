
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';
import Footer from '../components/landing/Footer';

const TermsOfServicePage = () => {
  // Scroll al inicio de la página cuando se carga el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#090744]">
      {/* Header simplificado */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#090744]/80 backdrop-blur-md py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Logo - Solo el ícono */}
          <Link to="/" className="flex items-center">
            <img src="/images/brand/logo.svg" alt="Spectrum" className="h-8" />
          </Link>

          {/* Desktop Navigation - Todos redirigen a inicio */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Características
            </Link>
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Cómo funciona
            </Link>
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Precios
            </Link>
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Testimonios
            </Link>
          </nav>
          
          {/* Call to Action Button */}
          <div className="hidden md:block">
            <Link to="/" className="px-5 py-2 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all">
              Contáctanos
            </Link>
          </div>
        </div>
      </header>
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              TÉRMINOS DE USO DE SPECTRUM AI ZOMAC S.A.S.
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-white/80 mb-10">
                <strong>Fecha de entrada en vigor:</strong> 14/04/2025
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">IDENTIFICACIÓN DE LAS PARTES</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM AI ZOMAC S.A.S., empresa constituida conforme a la ley colombiana conforme a las leyes de la República de Colombia, identificada con NIT No. 901.573.849-2 y domicilio en Salento, Quindío, actúa como prestadora de los servicios descritos en este documento. Estos Términos aplican al CLIENTE que haya suscrito un contrato de prestación de servicios con SPECTRUM para cualquiera de sus productos o planes.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">OBJETO</h2>
              <p className="text-white/80 mb-6">
                Este documento regula el acceso, uso, condiciones y restricciones que rigen los servicios prestados por SPECTRUM, conforme al contrato suscrito entre las partes.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">CONDICIONES DE ACCESO Y USO</h2>
              <p className="text-white/80 mb-4">
                El uso de los servicios de SPECTRUM es exclusivo, personal e intransferible del CLIENTE. Se prohíbe expresamente:
              </p>
              <ul className="list-disc pl-6 text-white/80 mb-6">
                <li>Ceder, sublicenciar o compartir el acceso a terceros.</li>
                <li>Usar los contenidos o asesorías fuera del alcance del contrato.</li>
                <li>Ejecutar ingeniería inversa o reproducir sistemas, metodologías o plataformas.</li>
              </ul>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">DESCRIPCIÓN GENERAL DE LOS SERVICIOS</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM ofrece servicios de back office que pueden incluir, entre otros: asesoría contable, financiera, legal, organización administrativa, acompañamiento personal y consultoría en contenido digital. Los servicios específicos y sus alcances dependen del plan contratado por el CLIENTE, conforme al contrato y sus anexos.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">OBLIGACIONES DEL CLIENTE</h2>
              <p className="text-white/80 mb-4">
                El CLIENTE se compromete a:
              </p>
              <ul className="list-disc pl-6 text-white/80 mb-6">
                <li>Cumplir con el pago de los servicios en los plazos acordados.</li>
                <li>Suministrar información veraz y actualizada.</li>
                <li>No compartir asesorías ni contenidos con terceros.</li>
                <li>Preservar la confidencialidad de la información recibida.</li>
                <li>Abstenerse de utilizar los servicios para fines ilícitos, inmorales o no autorizados.</li>
              </ul>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">PROPIEDAD INTELECTUAL</h2>
              <p className="text-white/80 mb-4">
                Todos los modelos, herramientas, bases de datos, plataformas, documentos y metodologías desarrolladas por SPECTRUM son de su exclusiva propiedad. El CLIENTE no podrá usarlas fuera del alcance del contrato ni registrarlas como propias.
              </p>
              <p className="text-white/80 mb-6">
                El contenido que el CLIENTE genere con base en las asesorías será de su propiedad exclusiva.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">PROTECCIÓN DE DATOS PERSONALES</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM cumple con la Ley 1581 de 2012 y normas complementarias. El CLIENTE autoriza el tratamiento de sus datos personales con el fin de ejecutar el contrato. Podrá ejercer sus derechos de acceso, rectificación o supresión mediante solicitud enviada a clientespr@spectrumai.com.co.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">LIMITACIÓN DE RESPONSABILIDAD</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM no garantiza resultados específicos. No asume responsabilidad por daños indirectos, lucro cesante o pérdida de información. La responsabilidad total de SPECTRUM se limitará al valor efectivamente pagado por el CLIENTE en los tres (3) meses anteriores al hecho que origine el reclamo.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">SOPORTE Y ATENCIÓN AL CLIENTE</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM atenderá los requerimientos del CLIENTE a través de los canales oficiales establecidos, tales como el correo electrónico clientespr@spectrumai.com.co, el número de WhatsApp 300 522 1473 y cualquier plataforma adicional habilitada por SPECTRUM para la atención al usuario, conforme a los niveles de severidad y tiempos establecidos en el contrato. El horario de atención es de lunes a viernes de 8:00 a.m. a 5:00 p.m., hora Colombia, excluyendo días festivos.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">MODIFICACIONES A LOS TÉRMINOS</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM podrá actualizar estos Términos de Uso en cualquier momento. En caso de cambios relevantes, se notificará al CLIENTE con al menos treinta (30) días de anticipación. Si el CLIENTE no está de acuerdo con los cambios, podrá solicitar la terminación del contrato antes de la fecha de entrada en vigor.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">VIGENCIA</h2>
              <p className="text-white/80 mb-6">
                Los presentes Términos estarán vigentes desde su publicación y mientras exista relación contractual entre las partes.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">LEGISLACIÓN Y RESOLUCIÓN DE CONTROVERSIAS</h2>
              <p className="text-white/80 mb-6">
                Estos Términos se rigen por las leyes colombianas. Cualquier disputa derivada se resolverá según el mecanismo de solución de controversias pactado en el contrato de prestación de servicios.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">DISPOSICIONES FINALES</h2>
              <ul className="list-disc pl-6 text-white/80 mb-6">
                <li>El contrato no podrá cederse sin autorización previa y escrita de la otra parte.</li>
                <li>Se prohíbe el uso de los servicios para actividades ilegales o contrarias a la ética empresarial.</li>
                <li>La nulidad de alguna cláusula no afectará la validez del resto del documento.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
