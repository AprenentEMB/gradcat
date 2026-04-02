export type Lang = 'ca' | 'es';

export const translations = {
  ca: {
    layout: {
      title: 'Graduacions.cat — Festes de Graduació a Barcelona',
      description:
        'Organitzem la festa de graduació perfecta a Barcelona. ESO, Batxillerat i Selectivitat. Sales exclusives, DJ, càtering, fotografia i aftermovie. Demana pressupost gratis.',
      skipToContent: 'Anar al contingut',
      locale: 'ca_ES',
    },
    header: {
      services: 'Serveis',
      packs: 'Packs',
      gallery: 'Galeria',
      contact: 'Contacte',
      blog: 'Blog',
      cta: 'Sol·licitar informació',
      mobileMenuLabel: 'Obrir menú',
      phonePlaceholder: 'El teu telèfon (ex: 612 345 678)',
      formSuccess: "Sol·licitud enviada! Et contactarem ben aviat.",
      formError: "Hi ha hagut un error. Si us plau, torna-ho a provar.",
      formSending: "Enviant...",
      formSent: "Enviat!",
    },
    hero: {
      preheadline: 'GRADUACIONS ESO, BATXILLERAT I UNIVERSITAT',
      headline1: 'Organitzem la teva graduació.',
      headline2: 'Tu només gaudeix.',
      subtitle:
        "Si vols organitzar la teva festa de graduació i no saps ni per on començar, nosaltres t’ajudem.",
      callbackTitle: 'La teva graduació comença aquí',
      phonePlaceholder: 'El teu telèfon (ex: 612 345 678)',
      contactBtn: 'Contactar-me',
      callbackNote:
        "Deixa'ns el teu número i ens posarem en contacte amb tu en menys de 24 hores.",
      badgeCount: '+50 graduacions',
      badgeLabel: 'organitzades amb èxit',
      formSuccess: "Sol·licitud enviada! Et contactarem ben aviat.",
      formError: "Hi ha hagut un error. Si us plau, torna-ho a provar.",
      formSending: "Enviant...",
      formSent: "Enviat!",
    },
    stats: [
      { value: '+8', label: 'anys d’experiència' },
      { value: '+100', label: 'Graduacions' },
      { value: '+11.000', label: 'Graduats feliços' },
    ],
    universities: {
      eyebrow: 'Confien en nosaltres',
      title: 'Organitzem les graduacions dels centres d’estudis més reconeguts',
      subtitle: "Graduats d'aquests centres ja han viscut la seva festa amb Graduacions.cat",
    },
    services: {
      eyebrow: 'Els nostres serveis',
      title: 'Tot el que necessites',
      subtitle: "Ens encarreguem de cada detall perquè només hagis de passar-ho bé.",
      items: [
        {
          title: 'Sopars & Càtering',
          description: 'Menús personalitzats per a tots els gustos amb opció de sopar i fer la festa al mateix lloc.',
        },
        {
          title: 'Sales Exclusives',
          description:
            'Les millors discoteques de Barcelona adaptades al vostre grup, pressupost i estil de festa.',
        },
        {
          title: 'DJ & Música',
          description:
            "Tenim DJ’s de tots els estils de música. Reggaeton, top hits, electrònica... 100% al vostre rotllo.",
        },
        {
          title: 'Fotografia Professional',
          description: 'Fotògrafs professionals per capturar tots els moments de la nit.',
        },
        {
          title: 'Aftermovie',
          description: 'Gravem tota la nit i editem un vídeo resum professional per compartir.',
        },
        {
          title: 'Photocall Personalitzat',
          description:
            'Photocall amb la vostra temàtica. El més compartit a xarxes de tota la nit.',
        },
      ],
    },
    cta: {
      title: 'Preparat per la millor nit de la teva vida!',
      subtitle:
        "Omple el formulari i et contactem en menys de 24h amb un pressupost personalitzat.",
      btn: 'Contactar-me',
      phonePlaceholder: 'El teu telèfon (ex: 612 345 678)',
      callbackNote: "Deixa'ns el teu número i ens posarem en contacte amb tu en menys de 24 hores.",
      formSuccess: "Sol·licitud enviada! Et contactarem ben aviat.",
      formError: "Hi ha hagut un error. Si us plau, torna-ho a provar.",
      formSending: "Enviant...",
      formSent: "Enviat!",
    },
    gallery: {
      eyebrow: 'LES NOSTRES GRADUACIONS',
      title: 'Organitzem graduacions especials',
      subtitle: 'Així ho passen els nostres graduats',
      images: [
        { alt: 'Festa de graduació amb confeti i llums' },
        { alt: 'Escenari amb llums de colors' },
        { alt: 'Celebració amb confeti' },
        { alt: 'DJ en event nocturn' },
        { alt: "Event amb il·luminació professional" },
      ],
    },
    packs: {
      eyebrow: 'PACKS DE GRADUACIONS',
      title: 'Tria la teva experiència',
      subtitle: 'Packs adaptats a cada tipus de graduació',
      popularLabel: 'Més popular',
      ctaBtn: 'SOL·LICITAR INFO',
      items: [
        {
          name: 'SOPAR',
          popular: false,
          features: ['Càtering', 'Menú per grups'],
        },
        {
          name: 'FESTA',
          popular: true,
          features: ['Locals', 'Entrades discoteques', 'Reservats VIP'],
        },
        {
          name: 'SOPAR + FESTA',
          popular: false,
          features: ['Càtering', 'Menú per grups', 'Locals', 'Entrades discoteques', 'Reservats VIP'],
        },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonis',
      title: 'El que diuen de nosaltres',
      googleRating: '347 ressenyes a Google',
      items: [
        {
          text: '"La millor nit de les nostres vides. El DJ va posar tots els temassos que vam demanar i les fotos van quedar per emmarcar. Vam plorar veient l\'aftermovie."',
          name: 'Marina García',
          school: 'UB',
          time: 'Fa 2 setmanes',
          avatar: '/testimonials/test1.webp',
        },
        {
          text: '"Pensàvem que organitzar una graduació per a 120 persones seria impossible. Ells se\'n van encarregar de tot. Només vam haver d\'anar i gaudir."',
          name: 'Marc Puig',
          school: 'UPF',
          time: 'Fa 1 mes',
          avatar: '/testimonials/test2.webp',
        },
        {
          text: '"El photocall personalitzat va ser un èxit total a xarxes. Tothom preguntava on ho vam fer. La decoració era increïble."',
          name: 'Laura Vidal',
          school: 'ESADE',
          time: 'Fa 3 setmanes',
          avatar: '/testimonials/test3.webp',
        },
      ],
    },
    faq: {
      title: 'Preguntes freqüents',
      items: [
        {
          question: 'Quant costa organitzar una graduació?',
          answer:
            "Des de <strong>20 € per persona</strong> per a l'ESO depenent del nombre de persones i serveis. Pots demanar-nos pressupost sense compromís.",
        },
        {
          question: 'De quantes persones mínim ha de ser la graduació?',
          answer:
            'Treballem amb grups <strong>des de 40 fins a més de 500 persones</strong>. Com més, millor preu.',
        },
        {
          question: 'Amb quanta antelació cal reservar la graduació?',
          answer:
            'Recomanem <strong>mínim 2-3 mesos</strong>, especialment per al maig-juny que s\'omple ràpid.',
        },
        {
          question: 'On se celebren les festes de graduació?',
          answer:
            'Tenim acords amb les <strong>millors sales i espais de Barcelona</strong>. Seleccionem l\'espai ideal segons el vostre grup i pressupost.',
        },
        {
          question: 'També organitzeu passo d\'equador?',
          answer:
            'I tant! És un format també que ens demanen molt des de les universitats.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacte',
      title: 'Tens dubtes sobre l\'organització de la teva graduació?',
      subtitle: 'Omple el formulari i et respondrem les teves preguntes per whatsapp en menys de 24h.',
      phoneLabel: 'Telèfon',
      messageLabel: 'Dubtes',
      messagePlaceholder: 'Deixa per aquí tots els dubtes que tinguis...',
      submitBtn: "Enviar sol·licitud",
      disclaimer: 'Et responem en menys de 24h. Sense compromís.',
      formSuccess: "Missatge enviat correctament. Et contactarem aviat!",
      formError: "Hi ha hagut un error. Prova-ho de nou o escriu-nos directament.",
      formSending: "Enviant...",
    },
    footer: {
      description:
        "Organització de festes de graduació a Barcelona d'ESO, Batxillerat i Universitat.",
      servicesTitle: 'Serveis',
      packsTitle: 'Tipus',
      contactTitle: 'Contacte',
      attention: 'Atenció 24/7',
      copyright: '© 2025 Graduacions.cat. Tots els drets reservats.',
      seoText: 'Graduacions Barcelona · Festes de graduació ESO, Batxillerat, Selectivitat',
      services: [
        'Sales Exclusives',
        'Sopars & Càtering',
        'DJ & Música',
        'Fotografia & Aftermovie',
        'Photocall',
      ],
      packs: [
        'Graduacions ESO',
        'Graduacions Batxillerat',
        'Graduacions Universitàries',
        'Pack Personalitzat',
      ],
    },
    whatsapp: {
      ariaLabel: 'Contactar per WhatsApp',
      message: 'Hola!%20M%27agradaria%20informaci%C3%B3%20sobre%20festes%20de%20graduaci%C3%B3',
    },
  },
  es: {
    layout: {
      title: 'Graduacions.cat — Fiestas de Graduación en Barcelona',
      description:
        'Organizamos la fiesta de graduación perfecta en Barcelona. ESO, Bachillerato y Selectividad. Salas exclusivas, DJ, catering, fotografía y aftermovie. Pide presupuesto gratis.',
      skipToContent: 'Ir al contenido',
      locale: 'es_ES',
    },
    header: {
      services: 'Servicios',
      packs: 'Packs',
      gallery: 'Galería',
      contact: 'Contacto',
      blog: 'Blog',
      cta: 'Solicitar información',
      mobileMenuLabel: 'Abrir menú',
      phonePlaceholder: 'Tu teléfono (ej: 612 345 678)',
      formSuccess: "¡Solicitud enviada! Te contactaremos muy pronto.",
      formError: "Ha habido un error. Por favor, inténtalo de nuevo.",
      formSending: "Enviando...",
      formSent: "¡Enviado!",
    },
    hero: {
      preheadline: 'GRADUACIONES ESO, BACHILLERATO Y UNIVERSIDAD',
      headline1: 'Organizamos tu graduación.',
      headline2: 'Tú solo disfruta.',
      subtitle:
        'Si quieres organizar tu fiesta de graduación y no sabes por dónde empezar, nosotros te ayudamos.',
      callbackTitle: 'Tu graduación empieza aquí',
      phonePlaceholder: 'Tu teléfono (ej: 612 345 678)',
      contactBtn: 'Contactarme',
      callbackNote:
        'Déjanos tu número y nos pondremos en contacto contigo en menos de 24 horas.',
      badgeCount: '+50 graduaciones',
      badgeLabel: 'organizadas con éxito',
      formSuccess: "¡Solicitud enviada! Te contactaremos muy pronto.",
      formError: "Ha habido un error. Por favor, inténtalo de nuevo.",
      formSending: "Enviando...",
      formSent: "¡Enviado!",
    },
    stats: [
      { value: '+8', label: 'Años de experiencia' },
      { value: '+100', label: 'Graduaciones' },
      { value: '+11.000', label: 'Graduados felices' },
    ],
    universities: {
      eyebrow: 'Confían en nosotros',
      title: 'Organizamos las graduaciones de los centros de estudios más reconocidos',
      subtitle: 'Graduados de estos centros ya han vivido su fiesta con Graduacions.cat',
    },
    services: {
      eyebrow: 'Nuestros servicios',
      title: 'Todo lo que necesitas',
      subtitle: 'Nos encargamos de cada detalle para que solo tengas que pasarlo bien.',
      items: [
        {
          title: 'Cenas & Catering',
          description: 'Menús personalizados para todos los gustos con opción de cenar y hacer la fiesta en el mismo lugar.',
        },
        {
          title: 'Salas Exclusivas',
          description:
            'Las mejores discotecas de Barcelona adaptadas a vuestro grupo, presupuesto y estilo de fiesta.',
        },
        {
          title: 'DJ & Música',
          description:
            'Tenemos DJ’s de todos los estilos de música. Reggaeton, top hits, electrónica... 100% a vuestro rollo.',
        },
        {
          title: 'Fotografía Profesional',
          description: 'Fotógrafos profesionales para capturar todos los momentos de la noche.',
        },
        {
          title: 'Aftermovie',
          description: 'Grabamos toda la noche y editamos un vídeo resumen profesional para compartir.',
        },
        {
          title: 'Photocall Personalizado',
          description:
            'Photocall con vuestra temática. Lo más compartido en redes de toda la noche.',
        },
      ],
    },
    cta: {
      title: '¡Preparado para la mejor noche de tu vida!',
      subtitle:
        'Rellena el formulario y te contactamos en menos de 24h con un presupuesto personalizado.',
      btn: 'Contactarme',
      phonePlaceholder: 'Tu teléfono (ej: 612 345 678)',
      callbackNote: 'Déjanos tu número y nos pondremos en contacto contigo en menos de 24 horas.',
      formSuccess: "¡Solicitud enviada! Te contactaremos muy pronto.",
      formError: "Ha habido un error. Por favor, inténtalo de nuevo.",
      formSending: "Enviando...",
      formSent: "¡Enviado!",
    },
    gallery: {
      eyebrow: 'NUESTRAS GRADUACIONES',
      title: 'Organizamos graduaciones especiales',
      subtitle: 'Así lo pasan nuestros graduados',
      images: [
        { alt: 'Fiesta de graduación con confeti y luces' },
        { alt: 'Escenario con luces de colores' },
        { alt: 'Celebración con confeti' },
        { alt: 'DJ en evento nocturno' },
        { alt: 'Evento con iluminación profesional' },
      ],
    },
    packs: {
      eyebrow: 'PACKS DE GRADUACIONES',
      title: 'Elige tu experiencia',
      subtitle: 'Packs adaptados a cada tipo de graduación',
      popularLabel: 'Más popular',
      ctaBtn: 'SOLICITAR INFO',
      items: [
        {
          name: 'CENA',
          popular: false,
          features: ['Catering', 'Menú para grupos'],
        },
        {
          name: 'FIESTA',
          popular: true,
          features: ['Locales', 'Entradas discotecas', 'Reservados VIP'],
        },
        {
          name: 'CENA + FIESTA',
          popular: false,
          features: ['Catering', 'Menú para grupos', 'Locales', 'Entradas discotecas', 'Reservados VIP'],
        },
      ],
    },
    testimonials: {
      eyebrow: 'Testimonios',
      title: 'Lo que dicen de nosotros',
      googleRating: '347 reseñas en Google',
      items: [
        {
          text: '"La mejor noche de nuestras vidas. El DJ puso todos los temazos que pedimos y las fotos quedaron para enmarcar. Lloramos viendo el aftermovie."',
          name: 'Marina García',
          school: 'IES Montserrat',
          time: 'Hace 2 semanas',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
          text: '"Pensábamos que organizar una graduación para 120 personas iba a ser imposible. Ellos se encargaron de todo. Solo tuvimos que ir y disfrutar."',
          name: 'Marc Puig',
          school: 'Col·legi Sant Ignasi',
          time: 'Hace 1 mes',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
          text: '"El photocall personalizado fue un éxito total en redes. Todos preguntando dónde lo hicimos. La decoración era increíble."',
          name: 'Laura Vidal',
          school: 'IES Pau Claris',
          time: 'Hace 3 semanas',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
      ],
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          question: '¿Cuánto cuesta organizar una graduación?',
          answer:
            'Desde <strong>20 € por persona</strong> para ESO dependiendo del número de personas y servicios. Puedes pedirnos presupuesto sin compromiso.',
        },
        {
          question: '¿De cuántas personas mínimo tiene que ser la graduación?',
          answer:
            'Trabajamos con grupos <strong>desde 40 hasta más de 500 personas</strong>. Cuantos más, mejor precio.',
        },
        {
          question: '¿Con cuánta antelación hay que reservar la graduación?',
          answer:
            'Recomendamos <strong>mínimo 2-3 meses</strong>, especialmente para mayo-junio que se llenan rápido.',
        },
        {
          question: '¿Dónde se celebran las fiestas de graduación?',
          answer:
            'Tenemos acuerdos con las <strong>mejores salas y espacios de Barcelona</strong>. Seleccionamos el espacio ideal según vuestro grupo y presupuesto.',
        },
        {
          question: '¿También organizáis paso del ecuador?',
          answer:
            '¡Por supuesto! Es un formato que también nos piden mucho desde las universidades.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Tienes dudas sobre la organización de tu graduación?',
      subtitle: 'Rellena el formulario y te responderemos por whatsapp en menos de 24h.',
      phoneLabel: 'Teléfono',
      messageLabel: 'Dudas',
      messagePlaceholder: 'Deja aquí todas las dudas que tengas...',
      submitBtn: 'Enviar solicitud',
      disclaimer: 'Te respondemos en menos de 24h. Sin compromiso.',
      formSuccess: "Mensaje enviado correctamente. ¡Te contactaremos pronto!",
      formError: "Ha habido un error. Inténtalo de nuevo o escríbenos directamente.",
      formSending: "Enviando...",
    },
    footer: {
      description:
        'Organización de fiestas de graduación en Barcelona de ESO, Bachillerato y Universidad.',
      servicesTitle: 'Servicios',
      packsTitle: 'Tipos',
      contactTitle: 'Contacto',
      attention: 'Atención 24/7',
      copyright: '© 2025 Graduacions.cat. Todos los derechos reservados.',
      seoText: 'Graduaciones Barcelona · Fiestas de graduación ESO, Bachillerato, Selectividad',
      services: [
        'Salas Exclusivas',
        'Cenas & Catering',
        'DJ & Música',
        'Fotografía & Aftermovie',
        'Photocall',
      ],
      packs: [
        'Graduaciones ESO',
        'Graduaciones Bachillerato',
        'Graduaciones Universitarias',
        'Pack Personalizado',
      ],
    },
    whatsapp: {
      ariaLabel: 'Contactar por WhatsApp',
      message: 'Hola!%20Me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20fiestas%20de%20graduaci%C3%B3n',
    },
  },
} as const;

export type Translations = typeof translations['ca'] | typeof translations['es'];
