export default function Footer() {
  return (
    <footer className="mt-12 bg-[#80B9BF] h-48">
      <div className="p-8 flex flex-col md:flex-row justify-between items-start gap-6 text-white max-w-6xl mx-auto">
        <div>

        </div>

        <div className="text-sm md:text-right">
          <a className="block" href="/datenschutz">Datenschutz</a>
          <a className="block" href="/impressum">Impressum</a>
          <div className="mt-4 text-xl" >
            <a href="https://www.instagram.com/yourusername" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

