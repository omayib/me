// CV Mode Toggle Functionality

document.addEventListener('DOMContentLoaded', function() {
    const cvToggleBtn = document.getElementById('cv-toggle-btn');
    const body = document.body;
    const mainNav = document.getElementById('mainNav');
    
    // Check if CV mode was previously enabled
    const cvModeEnabled = localStorage.getItem('cvModeEnabled') === 'true';
    
    // Initialize CV mode if it was previously enabled
    if (cvModeEnabled) {
        enableCVMode();
    }
    
    // Toggle CV mode on button click
    cvToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('cv-mode')) {
            disableCVMode();
        } else {
            enableCVMode();
        }
    });
    
    function enableCVMode() {
        body.classList.add('cv-mode');
        cvToggleBtn.classList.add('active');
        cvToggleBtn.innerHTML = '<i class="bi bi-file-text"></i> Normal View';
        cvToggleBtn.title = 'Return to normal landing page view';
        
        // Scroll to top when entering CV mode
        window.scrollTo(0, 0);
        
        // Store preference
        localStorage.setItem('cvModeEnabled', 'true');
        
        // Optional: Update page title
        const originalTitle = document.title;
        document.title = 'CV - ' + originalTitle.split(' – ')[0];
    }
    
    function disableCVMode() {
        body.classList.remove('cv-mode');
        cvToggleBtn.classList.remove('active');
        cvToggleBtn.innerHTML = '<i class="bi bi-file-pdf"></i> CV';
        cvToggleBtn.title = 'Convert to CV format';
        
        // Store preference
        localStorage.setItem('cvModeEnabled', 'false');
        
        // Restore page title
        location.reload(); // Simple way to restore everything
    }
    
    // Handle print events
    window.addEventListener('beforeprint', function() {
        if (body.classList.contains('cv-mode')) {
            // Already in CV mode, printing will use cv-print.css styles
        }
    });
    
    window.addEventListener('afterprint', function() {
        // Nothing special needed after print
    });
});
