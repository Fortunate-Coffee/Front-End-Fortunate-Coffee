import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import AdminEditCategoryForm from './AdminEditCategoryForm';
import AdminDeleteConfirm from './AdminDeleteConfirm';

const AdminCategoryCarousel = () => {
  const [category, setCategory] = useState([]);
  const [showAdminEditCategoryForm, setShowAdminEditCategoryForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const fetchCategory = async () => {
    try {
      const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/category');
      const data = await response.json();
      
      // Sort data by updatedAt in descending order
      const sortedData = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setCategory(sortedData);

      setCurrentIndex(Math.floor(data.length / 2)); // Mulai dari indeks tengah
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const handleEdit = (id) => {
    const categoryData = category.find(category => category.category_id === id);
    setEditFormData(categoryData);
    setShowAdminEditCategoryForm(true);
  };

  const handleDelete = async (id) => {
    try {
      // Ambil token dari local storage
      const token = localStorage.getItem('accessToken');
  
      const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/category/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
  
      setCategory(prevCategory => prevCategory.filter(item => item.category_id !== id));
      console.log(`Category with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const openDeleteConfirm = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === category.length - 1 ? 0 : prevIndex + 1));
    }, settings.autoplaySpeed);

    return () => clearInterval(interval);
  }, [currentIndex, category.length, settings.autoplaySpeed]);

  return (
    <div className="">
      {showAdminEditCategoryForm && (
        <AdminEditCategoryForm
          setShowEditCategoryForm={setShowAdminEditCategoryForm}
          editFormData={editFormData}
          category={category}
          fetchCategory={fetchCategory} // Tambahkan fetchCategory sebagai prop untuk refresh data setelah edit
        />
      )}
      {showDeleteConfirm && (
        <AdminDeleteConfirm
          setShowDeleteConfirm={setShowDeleteConfirm}
          entityName="category"
          itemId={deleteItemId}
          onConfirmDelete={handleDelete}
        />
      )}

      <Slider {...settings} afterChange={(index) => setCurrentIndex(index)}>
        {category.map((category) => (
          <div key={category.category_id}>
            <div className="relative mx-1 hover:scale-105 scale-95">
              <img src={category.category_image} alt={category.category_name} className="w-full h-40 object-cover rounded-xl shadow-md" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100">
                <h2 className="text-center text-lg font-bold">{category.category_name}</h2>
                <div className="flex justify-around text-sm">
                  <button onClick={() => handleEdit(category.category_id)} className="text-green-200 font-light">Edit</button>
                  <button onClick={() => openDeleteConfirm(category.category_id)} className="text-red-200 font-light">Delete</button>
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
