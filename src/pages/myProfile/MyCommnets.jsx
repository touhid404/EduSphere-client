import axios from 'axios';
import React, { use, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Alert from '../../components/Alert/Alert';
import { format } from 'date-fns';

const MyComments = ({ myCommentsPromise }) => {
  const initialComments = use(myCommentsPromise);
  const [comments, setComments] = useState(initialComments);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleSave = (id) => {
    const now = new Date();
    const commentDate = format(now, "PPP p");

    const updatedComment = {
      comment: editedText,
      commentDate,
    };

    axios.patch(`http://localhost:3000/updateComment/${id}`, updatedComment)
      .then(res => {
        if (res.data.modifiedCount) {
          const updatedComments = comments.map(comment =>
            comment._id === id
              ? { ...comment, comment: editedText, commentDate }
              : comment
          );
          setComments(updatedComments);
          Alert('success', 'Comment updated successfully!');
          setEditingId(null);
          setEditedText('');
        }
      })
      .catch(err => {
        console.error(err);
        Alert('error', 'Network or server error occurred');
      });
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
        axios.delete(`http://localhost:3000/comments/${_id}`)
          .then(res => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your comment has been deleted.",
                icon: "success"
              });
              const remaining = comments.filter(ar => ar._id !== _id);
              setComments(remaining);
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

  return (
    <div className="p-6 space-y-6  rounded-xl border border-gray-200 shadow-inner">
      <h1 className="text-3xl font-bold mb-6 text-pink-600 border-b pb-2">💬 My Comments ({comments.length})</h1>

      {comments.map(comment => (
        <div
          key={comment._id}
          className=" border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 space-y-3"
        >
          <div className="flex items-start gap-3">
            <div className="text-pink-600 mt-1">
              <FaCommentDots size={20} />
            </div>
            <div className="flex-1">
              {editingId === comment._id ? (
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                  rows={3}
                />
              ) : (
                <p className="text-base">{comment.comment}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {comment.commentDate || "Unknown"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            {editingId === comment._id ? (
              <button
                onClick={() => handleSave(comment._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(comment._id, comment.comment)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(comment._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComments;
