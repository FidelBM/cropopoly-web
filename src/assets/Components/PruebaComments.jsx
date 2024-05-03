import React, { useEffect } from 'react';

export const PruebaComments = () => {
  useEffect(() => {
    // Configuración de Disqus
    window.disqus_config = function () {
      this.page.url = window.location.href; // URL de la página
      this.page.identifier = 'unique_page_identifier'; // Identificador único de la página (puedes cambiarlo según tus necesidades)
    };

    // Carga el script de Disqus de forma asíncrona
    (function() {
      var d = document, s = d.createElement('script');
      s.src = 'https://cropopoly.disqus.com/embed.js'; // URL del script de Disqus
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, []); // Ejecuta este efecto solo una vez después de que el componente se monte

  return (
    <div id="disqus_thread" className='App-Basic-Color' ></div>
  );
};
