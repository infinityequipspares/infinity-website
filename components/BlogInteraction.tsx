"use client";

import { useState, useEffect, FormEvent } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, doc, setDoc, increment } from 'firebase/firestore';

export default function BlogInteraction({ slug, title }: { slug: string, title: string }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Likes & Check Local Storage
  useEffect(() => {
    // Check if user already liked this post in the past
    const checkLiked = localStorage.getItem(`liked_${slug}`);
    if (checkLiked === 'true') {
      setHasLiked(true);
    }

    const docRef = doc(db, 'blog_stats', slug);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setLikes(docSnap.data().likes || 0);
      }
    });
    return () => unsubscribe();
  }, [slug]);

  // 2. Fetch Comments
  useEffect(() => {
    const q = query(collection(db, 'blogs', slug, 'comments'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [slug]);

  // 3. Handle Like (Saves to Firebase AND Local Storage)
  const handleLike = async () => {
    if (hasLiked) return;
    
    setHasLiked(true);
    localStorage.setItem(`liked_${slug}`, 'true'); // Save in browser memory
    
    const docRef = doc(db, 'blog_stats', slug);
    await setDoc(docRef, { likes: increment(1) }, { merge: true });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    }
  };

  const submitComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !commentText) return;
    setIsSubmitting(true);
    
    await addDoc(collection(db, 'blogs', slug, 'comments'), {
      name,
      company: company || 'Industry Professional',
      text: commentText,
      timestamp: new Date(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    
    setName('');
    setCompany('');
    setCommentText('');
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      
      {/* Side-by-Side Action Bar */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 mb-10">
        
        {/* Share Box */}
        <div className="bg-gray-50 p-3 md:p-5 rounded-xl border border-gray-200 flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-2.5 md:gap-0 shadow-sm text-center">
          <span className="font-bold text-gray-800 text-xs md:text-sm">Share guide:</span>
          <button
            onClick={handleShare}
            className="bg-gray-900 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm w-full xl:w-auto"
          >
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>
        </div>

        {/* Like Box */}
        <div className="bg-gray-50 p-3 md:p-5 rounded-xl border border-gray-200 flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-2.5 md:gap-0 shadow-sm text-center">
           <div>
              <h4 className="text-gray-900 font-bold text-xs md:text-sm">Helpful?</h4>
            </div>
          
          <button 
            onClick={handleLike}
            disabled={hasLiked}
            className={`group flex items-center justify-center gap-1.5 px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold transition-all border w-full xl:w-auto ${
              hasLiked 
                ? 'bg-green-50 border-green-200 text-green-700 cursor-default' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-600 hover:text-red-700 shadow-sm'
            }`}
          >
            <span className="text-xs md:text-sm">{hasLiked ? '✓ Yes' : '👍 Yes'}</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] md:text-xs font-bold transition-colors ${
              hasLiked 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600 group-hover:bg-red-100 group-hover:text-red-700'
            }`}>
              {likes}
            </span>
          </button>
        </div>
      </div>

      {/* Professional Discussion Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-gray-800 font-bold text-base">Join the Discussion</h3>
        </div>
        <div className="p-4 md:p-6">
          <form onSubmit={submitComment} className="mb-10">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Full Name *" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors text-sm text-gray-800 placeholder-gray-400"
                  />
                  <input 
                    type="text" 
                    placeholder="Company / Designation (Optional)" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors text-sm text-gray-800 placeholder-gray-400"
                  />
                </div>
                <textarea 
                  placeholder="Share your industry insights or ask a question..." 
                  required 
                  rows={3}
                  value={commentText} 
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-colors text-sm resize-y text-gray-800 placeholder-gray-400"
                />
                <div className="flex justify-start">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-60 text-sm shadow-sm"
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
          </form>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="font-bold text-gray-800 mb-6 text-sm">
              Recent Comments ({comments.length})
            </h4>
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No comments yet. Be the first to share your thoughts.</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold text-sm border border-gray-200">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                        <div>
                          <span className="font-bold text-gray-900 text-sm mr-2">{comment.name}</span>
                          {comment.company && (
                            <span className="text-xs text-gray-500 font-medium">{comment.company}</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 mt-1 sm:mt-0">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
