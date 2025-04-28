
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/landing/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const PrivacyPolicyPage = () => {
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
              POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-white/80 mb-6">
                <strong>SPECTRUM AI ZOMAC S.A.S.</strong>
              </p>
              
              <p className="text-white/80 mb-6">
                <strong>Versión:</strong> 1.0
              </p>
              
              <p className="text-white/80 mb-10">
                <strong>Fecha de entrada en vigor:</strong> 14/04/2025
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">OBJETIVO</h2>
              <p className="text-white/80 mb-6">
                Garantizar el derecho constitucional de habeas data, la privacidad, intimidad y buen nombre de los titulares de datos personales tratados por SPECTRUM AI ZOMAC S.A.S. (en adelante "SPECTRUM"), conforme a lo dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013 y las normas complementarias o que las modifiquen.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">IDENTIFICACIÓN DE LA EMPRESA</h2>
              <p className="text-white/80 mb-2"><strong>Razón Social:</strong> SPECTRUM AI ZOMAC S.A.S.</p>
              <p className="text-white/80 mb-2"><strong>NIT:</strong> 901.573.849-2</p>
              <p className="text-white/80 mb-2"><strong>Domicilio:</strong> CL 5 # 5-16 LC 2, Salento, Quindío, Colombia</p>
              <p className="text-white/80 mb-2"><strong>Correo de contacto:</strong> juridico@spectrumai.com.co</p>
              <p className="text-white/80 mb-2"><strong>Teléfono:</strong> 322 534 0550</p>
              <p className="text-white/80 mb-6"><strong>Responsable de tratamiento:</strong> Legal</p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">DEFINICIONES</h2>
              <p className="text-white/80 mb-2"><strong>Dato personal:</strong> Cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.</p>
              <p className="text-white/80 mb-2"><strong>Datos sensibles:</strong> Aquellos que afectan la intimidad del titular o cuyo uso indebido puede generar su discriminación (por ejemplo, origen racial, salud, orientación sexual, datos biométricos).</p>
              <p className="text-white/80 mb-2"><strong>Datos públicos:</strong> Aquellos que no son semiprivados, privados o sensibles.</p>
              <p className="text-white/80 mb-2"><strong>Tratamiento:</strong> Cualquier operación sobre datos personales como recolección, almacenamiento, uso, circulación o supresión.</p>
              <p className="text-white/80 mb-2"><strong>Titular:</strong> Persona natural cuyos datos son objeto de tratamiento.</p>
              <p className="text-white/80 mb-2"><strong>Responsable del tratamiento:</strong> Persona que decide sobre el tratamiento de los datos.</p>
              <p className="text-white/80 mb-6"><strong>Encargado del tratamiento:</strong> Persona que realiza el tratamiento por cuenta del responsable.</p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">ALCANCE</h2>
              <p className="text-white/80 mb-6">
                Esta política aplica al tratamiento de datos personales de clientes, usuarios, empleados, proveedores y cualquier tercero cuyos datos sean tratados por SPECTRUM dentro o fuera del territorio colombiano.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">DATOS QUE SE RECOPILAN</h2>
              <p className="text-white/80 mb-6">
                Nombre, identificación, datos de contacto, datos financieros y de facturación, redes sociales, información profesional, contenido generado con relación a los servicios prestados, datos biométricos (cuando aplique).
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">FINALIDADES DEL TRATAMIENTO</h2>
              <ul className="list-disc pl-6 text-white/80 mb-6">
                <li>Prestación de servicios contratados</li>
                <li>Facturación, gestión contable, administrativa y legal</li>
                <li>Comunicaciones comerciales, publicitarias o informativas</li>
                <li>Evaluación de calidad</li>
                <li>Cumplimiento de obligaciones legales o contractuales</li>
                <li>Gestión de PQR y garantías contractuales</li>
              </ul>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">TRATAMIENTO DE DATOS SENSIBLES Y DE MENORES</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM no recolecta datos sensibles ni de menores de edad sin autorización previa, expresa e informada del titular o su representante legal. Su tratamiento estará restringido a los casos permitidos por la ley.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">DERECHOS DE LOS TITULARES</h2>
              <ul className="list-disc pl-6 text-white/80 mb-6">
                <li>Acceder, conocer, actualizar, rectificar y suprimir sus datos</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Ser informado del uso de sus datos</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio</li>
                <li>Revocar la autorización</li>
              </ul>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">DEBERES DE SPECTRUM</h2>
              <ul className="list-disc pl-6 text-white/80 mb-6">
                <li>Solicitar autorización previa, expresa e informada</li>
                <li>Garantizar la seguridad, confidencialidad y veracidad de los datos</li>
                <li>Atender consultas y reclamos en los términos de la ley</li>
                <li>Conservar prueba de la autorización</li>
              </ul>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">MECANISMOS PARA EJERCER DERECHOS</h2>
              <p className="text-white/80 mb-6">
                El titular podrá enviar solicitudes al correo habeasdata@spectrumai.com.co o mediante comunicación escrita a la dirección fiscal. Las consultas se atenderán en un plazo máximo de diez (10) días hábiles y los reclamos en un plazo de quince (15) días hábiles.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">TRANSFERENCIA Y TRANSMISIÓN DE DATOS</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM podrá compartir datos con aliados, asesores, plataformas tecnológicas, entidades estatales u otros encargados del tratamiento, siempre bajo acuerdos de confidencialidad y propósitos legales o contractuales. En caso de transferencias internacionales, se asegurará el cumplimiento de estándares adecuados de protección.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">SEGURIDAD DE LA INFORMACIÓN</h2>
              <p className="text-white/80 mb-6">
                SPECTRUM implementará medidas técnicas, humanas y administrativas para proteger los datos personales contra acceso no autorizado, pérdida, alteración o uso indebido.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">VIGENCIA DE LAS BASES DE DATOS</h2>
              <p className="text-white/80 mb-6">
                Los datos se conservarán mientras subsista la finalidad que justificó su tratamiento, o durante el tiempo exigido por normas contables, fiscales, laborales o contractuales.
              </p>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4">MODIFICACIONES A LA POLÍTICA</h2>
              <p className="text-white/80 mb-6">
                Esta política podrá ser actualizada. Las modificaciones se notificarán mediante correo, sitio web o medio apropiado. Su versión vigente estará disponible para consulta en la página web de SPECTRUM AI ZOMAC S.A.S.
              </p>
              
              <p className="text-white/80 mt-12 italic">
                Esta versión 0 ha sido revisada y adoptada el 14 de abril de 2025 por la Gerencia y el Departamento Legal de SPECTRUM AI ZOMAC S.A.S., quien actuará como área responsable del cumplimiento de esta política.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
