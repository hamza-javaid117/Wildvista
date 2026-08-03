import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionCard from "../components/profile/SectionCard";
import StatCard from "../components/profile/StatCard";
import BookingCard from "../components/profile/BookingCard";
import { profileData } from "../consts/profileData";
import { getProfile, updateProfile } from "../api/authApi";
import { getMyBookings } from "../api/bookingApi";
import { logoutUser } from "../utils/auth";

const starLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

export default function Profile() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(profileData.reviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [draftReviewId, setDraftReviewId] = useState(null);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    document.title = "WildVista | Profile";
    const fetchProfile = async () => {
      try {
        const [profileResponse, bookingsResponse] = await Promise.all([getProfile(), getMyBookings()]);
        if (profileResponse?.success) {
          setUser(profileResponse.user);
          setEditForm({
            name: profileResponse.user.name || "",
            phone: profileResponse.user.phone || "",
            address: profileResponse.user.address || "",
            city: profileResponse.user.city || "",
          });
        }
        if (bookingsResponse?.success) {
          setBookings(bookingsResponse.bookings || []);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          logoutUser();
          navigate("/login", { replace: true });
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (draftReviewId) {
      setReviews((prev) =>
        prev.map((item) => (item.id === draftReviewId ? { ...item, rating, comment: comment.trim() } : item))
      );
      setDraftReviewId(null);
    } else {
      setReviews((prev) => [
        ...prev,
        {
          id: Date.now(),
          tour: "Skardu Highlands",
          rating,
          comment: comment.trim(),
          date: "Just now",
        },
      ]);
    }

    setComment("");
    setRating(5);
  };

  const handleEditReview = (review) => {
    setDraftReviewId(review.id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleDeleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((item) => item.id !== reviewId));
    if (draftReviewId === reviewId) {
      setDraftReviewId(null);
      setComment("");
      setRating(5);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await updateProfile(editForm);
      if (!response?.success) {
        throw new Error(response?.message || "Unable to update profile.");
      }

      setUser(response.user);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Unable to update profile." });
    } finally {
      setSaving(false);
    }
  };

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] text-white">
        <p className="text-lg text-emerald-400">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_45%),rgba(10,10,10,0.9)] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <img src={profileData.user.avatar} alt={profileData.user.name} className="h-24 w-24 rounded-full border border-emerald-400/20 object-cover shadow-lg shadow-emerald-500/10" />
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">WildVista Member</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">{user?.name || "Traveler"}</h1>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-300">
                  <span>{user?.email || ""}</span>
                  <span>•</span>
                  <span>{user?.phone || ""}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-400">
                  <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently joined"}</span>
                  <span>•</span>
                  <span>0 tours completed</span>
                  <span>•</span>
                  <span>0 upcoming</span>
                </div>
              </div>
            </div>
            <button className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20">
              Edit Profile
            </button>
          </div>
        </motion.header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Bookings" value={bookings.length.toString()} accent="emerald" />
          <StatCard title="Upcoming Tours" value={bookings.filter((booking) => booking.status !== "Completed" && booking.status !== "Cancelled").length.toString()} accent="blue" />
          <StatCard title="Completed Tours" value={bookings.filter((booking) => booking.status === "Completed").length.toString()} accent="amber" />
          <StatCard title="Cancelled Tours" value={bookings.filter((booking) => booking.status === "Cancelled").length.toString()} accent="purple" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            <SectionCard title="My Bookings" action={<span className="text-sm text-emerald-400">{bookings.length} total</span>}>
              {bookings.length ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="rounded-[22px] border border-white/10 bg-[#111111]/70 p-4 text-sm text-gray-300">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-semibold text-white">{booking.tourTitle}</h4>
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">{booking.status}</span>
                      </div>
                      <div className="mt-3 space-y-2 text-sm text-gray-400">
                        <p>Pickup City: {booking.pickupCity}</p>
                        <p>Departure Date: {new Date(booking.departureDate).toLocaleDateString()}</p>
                        <p>Total Travellers: {Number(booking.adults || 0) + Number(booking.children || 0)}</p>
                        <p>Grand Total: Rs. {Number(booking.totalPrice || 0).toLocaleString()}</p>
                        <p>Payment: {booking.paymentStatus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[22px] border border-dashed border-white/15 bg-white/5 p-8 text-center text-gray-300">
                  No bookings yet.
                </div>
              )}
            </SectionCard>

            <SectionCard title="Reviews & Ratings" action={<span className="text-sm text-emerald-400">{averageRating}/5 average</span>}>
              <form onSubmit={handleSaveReview} className="mb-6 rounded-[24px] border border-white/10 bg-[#111111]/70 p-4">
                <div className="mb-3 flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button key={index} type="button" onClick={() => setRating(index + 1)} className="text-2xl text-amber-400">
                      {index < rating ? "★" : "☆"}
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-400">{starLabels[rating - 1]}</span>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="min-h-24 w-full rounded-2xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white outline-none ring-0"
                />
                <div className="mt-3 flex flex-wrap gap-3">
                  <button type="submit" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-emerald-400">
                    {draftReviewId ? "Update Review" : "Submit Review"}
                  </button>
                  {draftReviewId ? (
                    <button type="button" onClick={() => { setDraftReviewId(null); setComment(""); setRating(5); }} className="rounded-full border border-white/15 px-4 py-2 text-sm text-gray-300">
                      Cancel
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="space-y-3">
                {reviews.length ? reviews.map((review) => (
                  <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[22px] border border-white/10 bg-[#111111]/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{review.tour}</p>
                        <p className="text-sm text-gray-400">{review.date}</p>
                      </div>
                      <div className="text-amber-400">{"★".repeat(review.rating)}</div>
                    </div>
                    <p className="mt-3 text-sm text-gray-300">{review.comment}</p>
                    <div className="mt-4 flex gap-3">
                      <button type="button" onClick={() => handleEditReview(review)} className="text-sm text-emerald-400 hover:text-emerald-300">Edit</button>
                      <button type="button" onClick={() => handleDeleteReview(review.id)} className="text-sm text-rose-300 hover:text-rose-200">Delete</button>
                    </div>
                  </motion.div>
                )) : (
                  <div className="rounded-[22px] border border-dashed border-white/15 bg-white/5 p-8 text-center text-gray-300">
                    No reviews yet. Share your first experience.
                  </div>
                )}
              </div>
            </SectionCard>

          </div>

          <div className="space-y-6">
            <SectionCard title="My Profile">
              <form onSubmit={handleSaveProfile} className="space-y-3 text-sm text-gray-300">
                {message.text ? (
                  <div className={`rounded-[20px] border px-4 py-3 ${message.type === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-rose-500/30 bg-rose-500/10 text-rose-200"}`}>
                    {message.text}
                  </div>
                ) : null}
                <input name="name" value={editForm.name} onChange={handleEditChange} className="w-full rounded-[20px] border border-white/10 bg-[#111111]/70 p-4 text-white outline-none" placeholder="Full Name" />
                <input name="phone" value={editForm.phone} onChange={handleEditChange} className="w-full rounded-[20px] border border-white/10 bg-[#111111]/70 p-4 text-white outline-none" placeholder="Phone Number" />
                <input name="address" value={editForm.address} onChange={handleEditChange} className="w-full rounded-[20px] border border-white/10 bg-[#111111]/70 p-4 text-white outline-none" placeholder="Address" />
                <input name="city" value={editForm.city} onChange={handleEditChange} className="w-full rounded-[20px] border border-white/10 bg-[#111111]/70 p-4 text-white outline-none" placeholder="City" />
                <div className="rounded-[20px] border border-white/10 bg-[#111111]/70 p-4 text-gray-400">Email: {user?.email || ""}</div>
                <div className="rounded-[20px] border border-white/10 bg-[#111111]/70 p-4 text-gray-400">CNIC: {user?.cnic || ""}</div>
                <button type="submit" disabled={saving} className="w-full rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-emerald-400 disabled:opacity-70">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </SectionCard>

            <SectionCard title="Session" className="bg-[#111111]/80">
              <button onClick={handleLogout} className="w-full rounded-full bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/20">
                Logout
              </button>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
