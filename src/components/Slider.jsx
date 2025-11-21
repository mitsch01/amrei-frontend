import SliderLib from "react-slick";
import { Link } from "react-router-dom";

export default function RelatedSlider({ items }) {
  const safeItems = Array.isArray(items) ? items : [];
  const baseURL = import.meta.env.VITE_API_URL
  // console.log(safeItems);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-8">
      <h3 className="text-lg font-semibold mb-4 px-4">Related Work</h3>

      {safeItems.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No related projects.
        </div>
      ) : (
        <SliderLib {...settings}>
          {safeItems.map((item) => {
            const imgUrl = item.cover?.url
            return (
              <div key={item.id} className="px-2">
                <Link
                  to={`/articles/${item.slug}`}
                  className="relative block aspect-square overflow-hidden group"
                >
                  <img
                    src={`${baseURL}${imgUrl}`}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-4 bg-white bg-opacity-90 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-lg font-semibold text-center text-[#0D0D0D]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#F2D377] mt-1">
                      {Array.isArray(item.categories)
                        ? item.categories.map(category => category.name).sort((a, b) => a.localeCompare(b)).join(' / ').toUpperCase()
                        : item.category?.name?.sort((a, b) => a.localeCompare(b)).toUpperCase() || ''}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </SliderLib>
      )}
    </div>
  );
}