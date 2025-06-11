import { Suspense, use, useState } from 'react';
import { FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import { format } from 'date-fns';
import axios from 'axios';
import Alert from '../../components/Alert/Alert';
import Swal from 'sweetalert2';
import AllComments from './AllComments';
import Loader from '../../components/Loader/Loader';
const ArticleDetails = () => {




  const { article, comments } = useLoaderData();

  const [tempComments,setTempcomments] =  useState(comments);


  const {user} = use(AuthContext);

  const {
    _id,
    title,
    content,
    category,
    tags,
    thumbnail,
    postDate,
    authorEmail,
    authorName,
    authorProfile,
    
  } = article;
  //Like functionality 
   const [likes, setLikes] = useState(article.likeCount);
   const [commentCount, setCommentCount] = useState(article.commentCount);





   const handleLike = (id) => {
        if(user?.email=== authorEmail){
            Alert('error','Sorry, you can not like your own post');
            return;
        }
        const updatedLikes = likes + 1;
        setLikes(updatedLikes);
        const likeInfo = { likeCount: updatedLikes };

        axios.patch(`http://localhost:3000/likes/${id}`, likeInfo)
        .then(res => {
        if (res.data.modifiedCount > 0) {
        Alert('success', 'you like this article successfully!');
    }
  })
  .catch(err => {
    Alert('error', err.message || 'Failed to update article');
  });

       
    };


    


//  Comment modal function

const openCommentModal = () => {
  Swal.fire({
    title: "Add your comment",
    input: "textarea",
    inputPlaceholder: "Type your comment here...",
    inputAttributes: {
      'aria-label': 'Type your comment here'
    },
    showCancelButton: true,
    confirmButtonText: "Add"
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const comment = result.value;
      handleComment(comment); 
    }
  });
};

 const  handleCountCommentInArticle=(commentArticleId)=>{
     const updatedComment = commentCount + 1;
     setCommentCount(updatedComment)
     const commentInfo = { commentCount: updatedComment };
      axios.patch(`http://localhost:3000/upComment/${commentArticleId}`, commentInfo)
        .then(res => {
          if (res.data.modifiedCount > 0) {
        Alert('success', 'comment added successfully!'); 
          }
  })
  .catch(err => {
    Alert('error', err.message || 'Failed to update article');
  });

  }


  const handleComment= ( comment)=>{

    const now = new Date();
    const cDate = format(now, "PPP p"); 
    const commentData = {
            
            articleId : _id,
            userEmail: user?.email,
            userName: user?.displayName,
            userProfile: user?.photoURL,
            comment,
            commentDate: cDate
    }
    axios.post('http://localhost:3000/addcomments', commentData)
            .then(res => {
                if (res.data.insertedId) {
                    handleCountCommentInArticle(commentData.articleId); 
                    setTempcomments( [...tempComments, commentData]);
                    
                }
            })
            .catch(err => {
                Alert('error', err.message || 'Failed to comment');
            });
  }




  return (
    <div className="max-w-4xl mx-auto p-6  shadow-lg rounded-2xl mt-10 border border-gray-200">
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
      )}

      <h1 className="text-xl lg:text-3xl font-bold  mb-3">{title}</h1>

      <div className="flex justify-between items-center text-sm  mb-6 border-b pb-4">
        <span className="italic">Category: {category}</span>
        <span>Posted on: {postDate}</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={authorProfile}
          alt={authorName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-base font-semibold">{authorName}</p>
          <p className="text-sm ">{authorEmail}</p>
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <p>{content}</p>
      </div>

      {tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="  text-sm px-3 py-1 rounded-full border border-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-8  border-t pt-4 ml-5">
        <div className="flex items-center gap-2 text-sm">
          <button className="btn rounded-3xl border border-gray-500" onClick={()=> handleLike(_id)}>
            
            {/* <span className="font-semibold">{likes}</span> */}
          <FaRegThumbsUp size={18} className="" />
            
            <span>{likes} Like</span>
            
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button className="btn rounded-3xl border border-gray-500" onClick={openCommentModal}>
            <FaRegComment size={18} className="" />
            <span>{commentCount} comments</span>
            
          </button>


         

        </div>
        
      </div>
       <Suspense fallback={<Loader></Loader>}>
            <AllComments tempComments={tempComments}></AllComments>
          </Suspense>

    </div>

  );
};

export default ArticleDetails;
