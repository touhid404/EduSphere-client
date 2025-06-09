import axios from 'axios';
import React, { useState, use } from 'react';
import { BsInfoCircleFill } from 'react-icons/bs';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import Alert from '../../components/Alert/Alert';
import { format } from 'date-fns';
const MyLists = ({ myArticlesPromise }) => {
  const navigate = useNavigate();
  const initialArticleData = use(myArticlesPromise);
  const [myArticles, setMyArticles] = useState(initialArticleData);
  const [selectedArticle, setSelectedArticle] = useState(null); 

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

     const now = new Date();
    const postDate = format(now, "PPP p"); 
    const updatedData = {
      title: form.title.value,
      content: form.content.value,
      category: form.category.value,
      tags: form.tags.value.split(',').map(tag => tag.trim()),
      thumbnail: form.thumbnail.value,
      postDate
    };


    axios.patch(`http://localhost:3000/updateArticles/${selectedArticle._id}`, updatedData, {
})
.then(res => {
  if (res.data.modifiedCount) {
    Alert('success', 'Info Updated successfully!');
    const updatedArticles = myArticles.map(article =>
      article._id === selectedArticle._id ? { ...article, ...updatedData } : article
    );
    setMyArticles(updatedArticles);
  } else {
    Alert('error', 'Something went wrong while updating');
  }
})
.catch(err => {
  console.error(err);
  Alert('error', 'Network or server error occurred');
});

    form.closest('dialog').close();
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/articles/${_id}`)
          .then(res => {
            if (res.data.articleDeletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your post has been deleted.",
                icon: "success"
              });
              const remaining = myArticles.filter(ar => ar._id !== _id);
              setMyArticles(remaining);
            }
          })
          .catch(err => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error"
            });
          });
      }
    });
  };

  if (myArticles.length === 0) {
    return (
      <div className="text-center mt-20 min-h-screen">
        <title>My All Articles | Edu Sphere</title>
        <h2 className="text-2xl font-semibold mb-4">You have no posts</h2>
        <button
          onClick={() => navigate('/addArticle')}
          className="bg-primary text-white px-6 py-2 rounded"
        >
          Add a Post
        </button>
      </div>
    );
  }

  return (
    <div>
      <title>My All Articles | Edu Soft</title>
      <h2 className="text-3xl font-semibold text-center my-10">
        My Browse All Articles
      </h2>

      <div className="overflow-x-auto min-h-screen">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Date</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myArticles.map((singleArticle, index) => (
              <tr key={singleArticle._id}>
                <th>{index + 1}</th>
                <td>{singleArticle.title}</td>
                <td>{singleArticle.likeCount}</td>
                <td>{singleArticle.postDate}</td>
                <td>{singleArticle.category}</td>
                <td className="flex gap-4 justify-center items-center">
                  <Link to={`/articleDetail/${singleArticle._id}`} title="View Details">
                    <BsInfoCircleFill size={18} className="text-blue-600 hover:text-blue-900" />
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedArticle(singleArticle);
                      document.getElementById('edit_modal').showModal();
                    }}
                  >
                    <FiEdit size={18} className="text-green-600 hover:text-green-900 cursor-pointer" />
                  </button>
                  <FiTrash2
                    size={18}
                    title="Delete Post"
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                    onClick={() => handleDelete(singleArticle._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Edit Article</h3>

          {selectedArticle ? (
            <form onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium">Title:</label>
                  <input
                    type="text"
                    name="title"
                    className="input input-bordered w-full"
                    defaultValue={selectedArticle.title}
                  />
                </div>

                <div>
                  <label className="block font-medium">Content:</label>
                  <textarea
                    name="content"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    defaultValue={selectedArticle.content}
                  />
                </div>

                <div>
                  <label className="block font-medium">Category:</label>
                  <select
                    name="category"
                    className="select select-bordered w-full"
                    defaultValue={selectedArticle.category}
                  >
                    <option value="" disabled>Select category</option>
                    <option>Technology</option>
                    <option>Education</option>
                    <option>Health</option>
                    <option>Lifestyle</option>
                    <option>Finance</option>
                    <option>Science</option>
                    <option>Entertainment</option>
                    <option>Sports</option>
                    <option>Travel</option>
                    <option>Others</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium">Tags (comma separated):</label>
                  <input
                    type="text"
                    name="tags"
                    className="input input-bordered w-full"
                    defaultValue={selectedArticle.tags?.join(', ')}
                  />
                </div>

                <div>
                  <label className="block font-medium">Thumbnail Image URL</label>
                  <input
                    type="text"
                    name="thumbnail"
                    className="input input-bordered w-full"
                    defaultValue={selectedArticle.thumbnail}
                  />
                </div>
                
                
                <div>
                  <label className="block font-medium">Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    className="input input-bordered w-full"
                    defaultValue={selectedArticle.authorName}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block font-medium">Author Email</label>
                  <input
                    type="email"
                    name="authorEmail"
                    className="input input-bordered w-full"
                    defaultValue={selectedArticle.authorEmail}
                    readOnly
                  />
                </div>
                


                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => document.getElementById('edit_modal').close()}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p className="py-4">No article selected.</p>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyLists;
