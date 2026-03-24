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
      cta: 'Sol·licitar informació',
      mobileMenuLabel: 'Obrir menú',
    },
    hero: {
      headline1: 'Organitzem la teva graduació.',
      headline2: 'Tu, gaudeix.',
      subtitle:
        "Festes de graduació per a grups de l'ESO, Batxillerat, Pas de l'Equador, Fi de carrera.",
      callbackTitle: 'Et truquem gratis en 2 minuts',
      phonePlaceholder: 'El teu telèfon (ex: 612 345 678)',
      contactBtn: 'Contactar-me',
      callbackNote:
        "La teva graduació comença aquí. Deixa'ns les teves dades. Et contactarem en menys de 24h.",
      badgeCount: '+50 graduacions',
      badgeLabel: 'organitzades amb èxit',
    },
    stats: [
      { value: '+50', label: 'Graduacions organitzades' },
      { value: '+400', label: 'Graduats feliços' },
      { value: '100%', label: 'Satisfacció garantida' },
    ],
    universities: {
      eyebrow: 'Confien en nosaltres',
      title: 'Celebrem amb alumnes de les millors universitats',
      subtitle: "Graduats d'aquests centres ja han viscut la seva festa amb Graduacions.cat",
    },
    services: {
      eyebrow: 'Els nostres serveis',
      title: 'Tot el que necessites',
      subtitle: "Ens encarreguem de cada detall perquè només hagis de passar-ho bé.",
      items: [
        {
          title: 'Sales Exclusives',
          description:
            'Les millors sales de Barcelona adaptades al vostre grup, pressupost i estil de festa.',
        },
        {
          title: 'Sopars & Càtering',
          description: 'Menús personalitzats per a tots els gustos. Sopar i festa al mateix lloc.',
        },
        {
          title: 'DJ & Música',
          description:
            "La música la trieu vosaltres. Reggaeton, hits, electrònica... 100% al vostre rotllo.",
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
      title: 'Preparats per a la millor nit de la vostra vida?',
      subtitle:
        "Omple el formulari i et contactem en menys de 24h amb un pressupost personalitzat.",
      btn: 'Demanar pressupost gratis',
    },
    gallery: {
      eyebrow: 'Els nostres esdeveniments',
      title: 'Graduacions reals',
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
      eyebrow: 'Els nostres packs',
      title: 'Tria la teva experiència',
      subtitle: 'Packs adaptats a cada tipus de graduació',
      popularLabel: 'Més popular',
      ctaBtn: 'Sol·licitar info',
      items: [
        {
          name: 'ESO',
          popular: false,
          features: [
            'Sala privada 4h',
            'DJ & equip de so',
            'Il·luminació professional',
            'Photocall bàsic',
            "Coordinador d'event",
          ],
        },
        {
          name: 'Batxillerat',
          popular: true,
          features: [
            'Sala premium 6h',
            'DJ professional',
            'Sopar inclòs',
            'Fotògraf + 200 fotos',
            'Photocall personalitzat',
            'Aftermovie 2min',
          ],
        },
        {
          name: 'Selectivitat',
          popular: false,
          features: [
            'Sala VIP tota la nit',
            'DJ + Artista convidat',
            'Sopar gourmet',
            '2 Fotògrafs',
            'Aftermovie 5min',
            'Decoració temàtica',
            'Open bar 2h',
          ],
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
          school: 'IES Montserrat',
          time: 'Fa 2 setmanes',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
          text: '"Pensàvem que organitzar una graduació per a 120 persones seria impossible. Ells se\'n van encarregar de tot. Només vam haver d\'anar i gaudir."',
          name: 'Marc Puig',
          school: 'Col·legi Sant Ignasi',
          time: 'Fa 1 mes',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
        {
          text: '"El photocall personalitzat va ser un èxit total a xarxes. Tothom preguntava on ho vam fer. La decoració era increïble."',
          name: 'Laura Vidal',
          school: 'IES Pau Claris',
          time: 'Fa 3 setmanes',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
        },
      ],
    },
    faq: {
      title: 'Preguntes freqüents',
      items: [
        {
          question: 'Quant costa una graduació?',
          answer:
            "Depèn del nombre de persones i serveis. Des de 20€/persona per a l'ESO fins a esdeveniments premium. <strong>Demana pressupost sense compromís.</strong>",
        },
        {
          question: 'Amb quanta antelació cal reservar?',
          answer:
            'Recomanem <strong>mínim 2-3 mesos</strong>, especialment per al maig-juny que s\'omple ràpid.',
        },
        {
          question: 'Quantes persones mínim?',
          answer:
            'Treballem amb grups <strong>des de 50 fins a 500+ persones</strong>. Com més, millor preu.',
        },
        {
          question: 'On se celebren les festes?',
          answer:
            'Tenim acords amb les <strong>millors sales i espais de Barcelona</strong>. Seleccionem l\'espai ideal segons el vostre grup i pressupost.',
        },
        {
          question: 'Podem triar la música?',
          answer:
            '<strong>Per descomptat.</strong> Vosaltres decidiu l\'estil i els temassos. El DJ s\'adapta 100% als vostres gustos.',
        },
        {
          question: "Quan rebem les fotos i l'aftermovie?",
          answer:
            'Les fotos en <strong>48-72h</strong> i l\'aftermovie editat en <strong>màxim 2 setmanes</strong> després de l\'event.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacte',
      title: "Explica'ns la teva graduació",
      subtitle: "Omple el formulari i t'enviem un pressupost personalitzat en menys de 24h.",
      nameLabel: 'Nom',
      namePlaceholder: 'El teu nom',
      emailLabel: 'Email',
      phoneLabel: 'Telèfon',
      schoolLabel: 'Centre educatiu',
      schoolPlaceholder: "Nom de l'institut",
      typeLabel: 'Tipus de graduació',
      typePlaceholder: 'Selecciona',
      typeOptions: [
        { value: 'eso', label: 'ESO' },
        { value: 'batxillerat', label: 'Batxillerat' },
        { value: 'selectivitat', label: 'Selectivitat' },
        { value: 'universitat', label: 'Universitat' },
        { value: 'altre', label: 'Altre' },
      ],
      peopleLabel: 'Nombre de persones',
      messageLabel: 'Missatge',
      messagePlaceholder: "Explica'ns més sobre el que busqueu...",
      submitBtn: "Enviar sol·licitud",
      disclaimer: 'Et responem en menys de 24h. Sense compromís.',
    },
    footer: {
      description:
        'Organitzem festes de graduació inoblidables a Barcelona. ESO, Batxillerat, Selectivitat i universitat.',
      servicesTitle: 'Serveis',
      packsTitle: 'Packs',
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
        'Graduació ESO',
        'Graduació Batxillerat',
        'Graduació Selectivitat',
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
      cta: 'Solicitar información',
      mobileMenuLabel: 'Abrir menú',
    },
    hero: {
      headline1: 'Organizamos tu graduación.',
      headline2: 'Tú solo disfruta.',
      subtitle:
        'Fiestas de graduación para grupos de la ESO, Bachillerato, Pasos de ecuador, Fin de carrera.',
      callbackTitle: 'Te llamamos gratis en 2 minutos',
      phonePlaceholder: 'Tu teléfono (ej: 612 345 678)',
      contactBtn: 'Contactarme',
      callbackNote:
        'Tu graduación empieza aquí. Déjanos tus datos. Te contactaremos en menos de 24h.',
      badgeCount: '+50 graduaciones',
      badgeLabel: 'organizadas con éxito',
    },
    stats: [
      { value: '+50', label: 'Graduaciones organizadas' },
      { value: '+400', label: 'Graduados felices' },
      { value: '100%', label: 'Satisfacción garantizada' },
    ],
    universities: {
      eyebrow: 'Confían en nosotros',
      title: 'Celebramos con alumnos de las mejores universidades',
      subtitle: 'Graduados de estos centros ya han vivido su fiesta con Graduacions.cat',
    },
    services: {
      eyebrow: 'Nuestros servicios',
      title: 'Todo lo que necesitas',
      subtitle: 'Nos encargamos de cada detalle para que solo tengas que pasarlo bien.',
      items: [
        {
          title: 'Salas Exclusivas',
          description:
            'Las mejores salas de Barcelona adaptadas a vuestro grupo, presupuesto y estilo de fiesta.',
        },
        {
          title: 'Cenas & Catering',
          description: 'Menús personalizados para todos los gustos. Cena y fiesta en el mismo sitio.',
        },
        {
          title: 'DJ & Música',
          description:
            'La música la elegís vosotros. Reggaeton, hits, electrónica... 100% a vuestro rollo.',
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
      title: '¿Preparados para la mejor noche de vuestra vida?',
      subtitle:
        'Rellena el formulario y te contactamos en menos de 24h con un presupuesto personalizado.',
      btn: 'Pedir presupuesto gratis',
    },
    gallery: {
      eyebrow: 'Nuestros eventos',
      title: 'Graduaciones reales',
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
      eyebrow: 'Nuestros packs',
      title: 'Elige tu experiencia',
      subtitle: 'Packs adaptados a cada tipo de graduación',
      popularLabel: 'Más popular',
      ctaBtn: 'Solicitar info',
      items: [
        {
          name: 'ESO',
          popular: false,
          features: [
            'Sala privada 4h',
            'DJ & equipo de sonido',
            'Iluminación profesional',
            'Photocall básico',
            'Coordinador de evento',
          ],
        },
        {
          name: 'Bachillerato',
          popular: true,
          features: [
            'Sala premium 6h',
            'DJ profesional',
            'Cena incluida',
            'Fotógrafo + 200 fotos',
            'Photocall personalizado',
            'Aftermovie 2min',
          ],
        },
        {
          name: 'Selectividad',
          popular: false,
          features: [
            'Sala VIP toda la noche',
            'DJ + Artista invitado',
            'Cena gourmet',
            '2 Fotógrafos',
            'Aftermovie 5min',
            'Decoración temática',
            'Open bar 2h',
          ],
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
          question: '¿Cuánto cuesta una graduación?',
          answer:
            'Depende del número de personas y servicios. Desde 20€/persona para ESO hasta eventos premium. <strong>Pide presupuesto sin compromiso.</strong>',
        },
        {
          question: '¿Con cuánta antelación hay que reservar?',
          answer:
            'Recomendamos <strong>mínimo 2-3 meses</strong>, especialmente para mayo-junio que se llenan rápido.',
        },
        {
          question: '¿Cuántas personas mínimo?',
          answer:
            'Trabajamos con grupos <strong>desde 50 hasta 500+ personas</strong>. Cuantos más, mejor precio.',
        },
        {
          question: '¿Dónde se celebran las fiestas?',
          answer:
            'Tenemos acuerdos con las <strong>mejores salas y espacios de Barcelona</strong>. Seleccionamos el espacio ideal según vuestro grupo y presupuesto.',
        },
        {
          question: '¿Podemos elegir la música?',
          answer:
            '<strong>Por supuesto.</strong> Vosotros decidís el estilo y los temazos. El DJ se adapta 100% a vuestros gustos.',
        },
        {
          question: '¿Cuándo recibimos las fotos y el aftermovie?',
          answer:
            'Las fotos en <strong>48-72h</strong> y el aftermovie editado en <strong>máximo 2 semanas</strong> después del evento.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntanos tu graduación',
      subtitle: 'Rellena el formulario y te enviamos un presupuesto personalizado en menos de 24h.',
      nameLabel: 'Nombre',
      namePlaceholder: 'Tu nombre',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono',
      schoolLabel: 'Centro educativo',
      schoolPlaceholder: 'Nombre del instituto',
      typeLabel: 'Tipo de graduación',
      typePlaceholder: 'Selecciona',
      typeOptions: [
        { value: 'eso', label: 'ESO' },
        { value: 'bachillerato', label: 'Bachillerato' },
        { value: 'selectividad', label: 'Selectividad' },
        { value: 'universidad', label: 'Universidad' },
        { value: 'otro', label: 'Otro' },
      ],
      peopleLabel: 'Número de personas',
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntanos más sobre lo que buscáis...',
      submitBtn: 'Enviar solicitud',
      disclaimer: 'Te respondemos en menos de 24h. Sin compromiso.',
    },
    footer: {
      description:
        'Organizamos fiestas de graduación inolvidables en Barcelona. ESO, Bachillerato, Selectividad y universidad.',
      servicesTitle: 'Servicios',
      packsTitle: 'Packs',
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
        'Graduación ESO',
        'Graduación Bachillerato',
        'Graduación Selectividad',
        'Pack Personalizado',
      ],
    },
    whatsapp: {
      ariaLabel: 'Contactar por WhatsApp',
      message: 'Hola!%20Me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20fiestas%20de%20graduaci%C3%B3n',
    },
  },
} as const;

export type Translations = typeof translations.ca;
