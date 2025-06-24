import axios from 'axios';
import React, { use } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Alert from '../../components/Alert/Alert';
import { format } from 'date-fns';

const MyComments = ({ myCommentsPromise }) => {
  const initialComments = use(myCommentsPromise);
  const [comments, setComments] = React.useState(initialComments);

  const handleEdit = (id, currentText) => {
    Swal.fire({
      title: "Edit your comment",
      input: "textarea",
      inputValue: currentText,
      inputPlaceholder: "Type your updated comment here...",
      inputAttributes: {
        'aria-label': 'Type your updated comment here'
      },
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: (value) => {
        if (!value.trim()) {
          Swal.showValidationMessage("Comment cannot be empty");
        }
        return value;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        handleSave(id, result.value);
      }
    });
  };

  // Save edited comment
  const handleSave = (id, updatedText) => {
    const now = new Date();
    const commentDate = format(now, "PPP p");

    const updatedComment = {
      comment: updatedText,
      commentDate,
    };

   

    axios.patch(`https://edusphere-server.vercel.app/updateComment/${id}`, updatedComment)
      .then(res => {
        if (res.data.modifiedCount) {
          const updatedComments = comments.map(comment =>
            comment._id === id
              ? { ...comment, comment: updatedText, commentDate }
              : comment
          );
          setComments(updatedComments);
          Alert('success', 'Comment updated successfully!');
        }
      })
      .catch(err => {
        console.error(err);
        Alert('error', 'Network or server error occurred');
      });
  };

  // Delete comment with confirmation
  // const handleDelete = (_id,articleId) => {
  //   Swal.fire({
  //     title: "Are you sure to delete?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axios.delete(`https://edusphere-server.vercel.app/comments/${_id}`)
  //         .then(res => {
  //           if (res.data.deletedCount) {
  //             Swal.fire({
  //               title: "Deleted!",
  //               text: "Your comment has been deleted.",
  //               icon: "success"
  //             });
  //             const remaining = comments.filter(ar => ar._id !== _id);
  //             setComments(remaining);
  //           }
  //         })
  //         .catch(err => {
  //           console.error(err);
  //           Swal.fire({
  //             title: "Error!",
  //             text: "Something went wrong while deleting.",
  //             icon: "error"
  //           });
  //         });
  //     }
  //   });
  // };

  const handleDelete = (_id, articleId) => {
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
      axios.delete(`https://edusphere-server.vercel.app/comments/${_id}?articleId=${articleId}`)
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
    <div className="p-6 space-y-6 rounded-xl border border-gray-200 shadow-inner">
      <h1 className="text-xl font-bold mb-6 text-pink-600 border-b pb-2">
        💬 My Comments ({comments.length})
      </h1>

      {comments.map(comment => (
        <div
          key={comment._id}
          className="border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 space-y-3"
        >
          <div className="flex items-start gap-3">
            <div className="text-pink-600 mt-1">
              <FaCommentDots size={20} />
            </div>
            <div className="flex-1">
              <p className="text-base">{comment.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                Last updated: {comment.commentDate || "Unknown"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => handleEdit(comment._id, comment.comment)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(comment._id,comment.articleId)}
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
