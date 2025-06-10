import React, { useContext, useState, Suspense } from 'react';
import { AuthContext } from '../../provider/AuthContext';
import Alert from '../../components/Alert/Alert';
import { myCommentsPromise } from './../../api/CommentApi';
import Lottie from 'lottie-react';
import profileLottie from '../../assets/lottie/myProfile.json';
import MyComments from './MyCommnets';
import Loader from '../../components/Loader/Loader';

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    updateUserProfile({
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        Alert('success', 'Profile updated successfully!');
      })
      .catch((error) => {
        Alert('error', error.message);
      });
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto shadow-lg border border-indigo-200 rounded-xl overflow-hidden">
        <div className="md:w-1/2 flex items-center justify-center p-6 ">
          <Lottie animationData={profileLottie} style={{ width: '100%', maxWidth: 400 }} />
        </div>

        <div className="md:w-1/2 p-8">
          <title>Profile | Edu Sphere</title>
          <h2 className="text-2xl font-bold text-center mb-2">Your Profile</h2>
          <p className="text-center text-sm mb-6 text-gray-600">
            Update your profile information below.
          </p>

          <form className="space-y-5" onSubmit={handleUpdateProfile}>
            <div>
              <label className="block mb-1 font-medium">Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-4 py-2   border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-md hover:from-pink-600 hover:to-red-600 transition"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 max-w-4xl mx-auto">
        <Suspense fallback={<Loader />}>
          <MyComments myCommentsPromise={myCommentsPromise(user?.email)} />
        </Suspense>
      </div>
    </div>
  );
};

export default MyProfile;
