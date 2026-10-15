export const backToTop = () => {
    const btnBack = document.getElementById('backToTop');
    btnBack.addEventListener('click', () => [
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    ])

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            btnBack.classList.remove('hidden');
        } else {
            btnBack.classList.add('hidden');
        }
    })
}