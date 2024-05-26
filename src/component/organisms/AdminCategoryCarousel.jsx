import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import AdminEditCategoryForm from './AdminEditCategoryForm';
import AdminDeleteConfirm from './AdminDeleteConfirm';

export const images = [
  { id: 1, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Asian%20Cuisine.jpeg?updatedAt=1716675783618', title: 'Asian Cuisine' },
  { id: 2, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fast%20Food.png?updatedAt=1716675784293', title: 'Fast Food' },
  { id: 3, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Bread.jpeg?updatedAt=1716675783368', title: 'Fortunate Bread' },
  { id: 4, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Coffee.jpeg?updatedAt=1716675783816', title: 'Fortunate Coffee' },
  { id: 5, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Dessert.jpg?updatedAt=1716675783436', title: 'Fortunate Dessert' },
  { id: 6, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Rice.jpg?updatedAt=1716675782922', title: 'Fortunate Rice' },
  { id: 7, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Tea.jpg?updatedAt=1716675783012', title: 'Fortunate Tea' },
  { id: 8, src: 'https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Mocktail.jpeg?updatedAt=1716675783686', title: 'Fresh Mocktail' },
  // Tambahkan data gambar sesuai kebutuhan Anda
];

const AdminCategoryCarousel = () => {
  const [showAdminEditCategoryForm, setShowAdminEditCategoryForm] = useState(false);
  const [showAdminDeleteConfirm, setShowAdminDeleteConfirm] = useState(false);
    const [editFormData, setEditFormData] = useState({});

  const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2)); // Mulai dari indeks tengah

  const settings = {
    infinite: true, // Mengatur slider agar kembali ke awal setelah mencapai akhir
    speed: 500,
    slidesToShow: 7, // Menyesuaikan jumlah gambar yang ditampilkan
    slidesToScroll: 1,
    autoplay: true, // Mengaktifkan auto geser
    autoplaySpeed: 1500, // Interval auto geser (dalam milidetik)
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleEdit = (id) => {
    // Temukan data gambar yang sesuai berdasarkan id
    const imageData = images.find(image => image.id === id);
    // Kirim data gambar yang sesuai ke form edit
    setEditFormData(imageData);
    setShowAdminEditCategoryForm(true);
  };

  const handleDelete = (id) => {
    // Logika untuk hapus gambar dengan id tertentu
    console.log(`Delete image with id: ${id}`);
  };

  useEffect(() => {
    // Perbarui index setiap kali slider berubah
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, settings.autoplaySpeed);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, settings.autoplaySpeed]);

  return (
    <div className="">
      {showAdminEditCategoryForm && <AdminEditCategoryForm setShowEditCategoryForm={setShowAdminEditCategoryForm} editFormData={editFormData}/>}
      {showAdminDeleteConfirm && <AdminDeleteConfirm setShowAdminDeleteConfirm={setShowAdminDeleteConfirm}/>}

      <Slider {...settings} afterChange={(index) => setCurrentIndex(index)}>
      {images.map((image, index) => (
        <div key={image.id}>
          <div className={`relative mx-1 hover:scale-105 scale-95`}>
            <img src={image.src} alt={image.title} className="w-full h-auto rounded-xl shadow-md" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100">
              <h2 className="text-center text-lg font-bold">{image.title}</h2>
              <div className="flex justify-around text-sm">
                <button onClick={() => handleEdit(image.id)} className='text-green-200 font-light'>Edit</button>
                <button onClick={() => setShowAdminDeleteConfirm(true)}className='text-red-200 font-light'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    </div>
  );
};

const PrevArrow = ({ onClick }) => (
  <button className="absolute fixed z-10 top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={onClick}>
    <i className="fas fa-chevron-left hover:scale-110"></i>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button className="absolute fixed z-10 top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={onClick}>
    <i className="fas fa-chevron-right hover:scale-110"></i>
  </button>
);

export default AdminCategoryCarousel;