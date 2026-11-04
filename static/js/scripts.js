

const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'activities', 'skills', 'publications', 'books', 'works', 'contributions','grant']


window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link:not(.dropdown-toggle), #navbarResponsive .dropdown-item')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
                if (name === 'activities') updateActivityStatus();
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    })

}); 


// Label each activity as Upcoming / Ongoing / Done based on today's date.
// Markup: <span class="activity-status" data-start="YYYY-MM-DD" data-end="YYYY-MM-DD"></span>
function updateActivityStatus() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const toDate = str => {
        const [y, m, d] = str.split('-').map(Number);
        return new Date(y, m - 1, d);
    };
    document.querySelectorAll('.activity-status').forEach(el => {
        const start = toDate(el.dataset.start);
        const end = toDate(el.dataset.end || el.dataset.start);
        let label, cls, icon;
        if (today < start) {
            label = 'Upcoming'; cls = 'bg-primary'; icon = 'bi-clock';
        } else if (today > end) {
            label = 'Done'; cls = 'bg-secondary'; icon = 'bi-check-circle';
        } else {
            label = 'Ongoing'; cls = 'bg-success'; icon = 'bi-broadcast';
        }
        el.className = `activity-status badge rounded-pill ${cls} ms-2 align-middle`;
        el.innerHTML = `<i class="bi ${icon}"></i> ${label}`;
    });
}
