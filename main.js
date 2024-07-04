function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    elements.forEach(el => {
      const file = el.getAttribute('data-include');
      if (file) {
        fetch(file)
          .then(response => {
            if (response.ok) return response.text();
            throw new Error('Network response was not ok.');
          })
          .then(data => {
            // Get the data attributes for dynamic content
            const content = JSON.parse(el.getAttribute('data-content') || '{}');
            
            // Replace placeholders with actual data
            Object.keys(content).forEach(key => {
              const regex = new RegExp(`{${key}}`, 'g');
              data = data.replace(regex, content[key]);
            });
  
            el.innerHTML = data;
            el.removeAttribute('data-include');
            includeHTML(); // Call recursively in case there are nested includes
          })
          .catch(error => console.error('Error fetching the file:', error));
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', includeHTML);