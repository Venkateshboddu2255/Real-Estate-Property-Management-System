import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "http://localhost:5000";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);

  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    phone: "",
    appointmentDate: "",
    message: "",
  });

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API}/api/properties/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Property not found");
        }

        setProperty(data.property || data);
      } catch (err) {
        setError(err.message || "Unable to load property");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  const addToFavorites = () => {
    if (!property) return;

    const favorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const alreadyFavorite = favorites.some(
      (item) => item._id === property._id
    );

    if (alreadyFavorite) {
      alert("Property is already in favorites.");
      return;
    }

    const updatedFavorites = [...favorites, property];

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );

    alert("Property added to favorites ❤️");
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: id,
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone,
          message: enquiry.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send enquiry");
      }

      alert("Enquiry sent successfully.");
      setShowEnquiry(false);
      setEnquiry({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert(err.message || "Failed to send enquiry");
    }
  };

  const submitAppointment = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property: id,
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          appointmentDate: appointment.appointmentDate,
          message: appointment.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to book visit");
      }

      alert("Property visit requested successfully.");
      setShowAppointment(false);
      setAppointment({
        name: "",
        email: "",
        phone: "",
        appointmentDate: "",
        message: "",
      });
    } catch (err) {
      alert(err.message || "Failed to book visit");
    }
  };

  if (loading) {
    return (
      <div className="page empty">
        <h2>Loading property...</h2>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="page empty">
        <h2>Property not found</h2>
        <p>{error}</p>
      </div>
    );
  }

  const image =
    property.images?.[0] ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";

  return (
    <div className="page">
      <div className="details">
        <div>
          <img
            className="details-main-image"
            src={image}
            alt={property.title}
          />
        </div>

        <div>
          <span className="property-status">{property.status}</span>

          <h1>{property.title}</h1>

          <p className="location">📍 {property.location}</p>

          <h2 className="details-price">
            ₹{Number(property.price || 0).toLocaleString("en-IN")}
          </h2>

          <div className="details-stats">
            <span>🛏 {property.bedrooms || 0} Beds</span>
            <span>🛁 {property.bathrooms || 0} Baths</span>
            <span>📐 {property.area || 0} sq.ft</span>
          </div>

          <p>{property.description}</p>

          <p>
            <b>Type:</b> {property.propertyType} &nbsp;
            <b>Listing:</b> {property.listingType} &nbsp;
            <b>Parking:</b> {property.parking ? "Yes" : "No"}
          </p>

          <h3>Amenities</h3>

          <div className="amenities">
            {(property.amenities || []).map((amenity, index) => (
              <span key={`${amenity}-${index}`}>{amenity}</span>
            ))}
          </div>

          <div className="details-actions">
            <button
              className="primary-button"
              onClick={() => setShowEnquiry(true)}
            >
              Send Enquiry
            </button>

            <button
              className="secondary-blue-button"
              onClick={() => setShowAppointment(true)}
            >
              📅 Book Property Visit
            </button>

            <button
              className="favorite-button"
              onClick={addToFavorites}
            >
              ❤️ Add to Favorites
            </button>
          </div>
        </div>
      </div>

      {showEnquiry && (
        <div className="modal">
          <form className="modal-card" onSubmit={submitEnquiry}>
            <h2>Send Enquiry</h2>

            <input
              required
              placeholder="Name"
              value={enquiry.name}
              onChange={(event) =>
                setEnquiry({
                  ...enquiry,
                  name: event.target.value,
                })
              }
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={enquiry.email}
              onChange={(event) =>
                setEnquiry({
                  ...enquiry,
                  email: event.target.value,
                })
              }
            />

            <input
              required
              type="tel"
              placeholder="Phone"
              value={enquiry.phone}
              onChange={(event) =>
                setEnquiry({
                  ...enquiry,
                  phone: event.target.value,
                })
              }
            />

            <textarea
              required
              placeholder="Message"
              value={enquiry.message}
              onChange={(event) =>
                setEnquiry({
                  ...enquiry,
                  message: event.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button className="primary-button" type="submit">
                Send
              </button>

              <button
                type="button"
                onClick={() => setShowEnquiry(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showAppointment && (
        <div className="modal">
          <form className="modal-card" onSubmit={submitAppointment}>
            <h2>Book Property Visit</h2>

            <input
              required
              placeholder="Name"
              value={appointment.name}
              onChange={(event) =>
                setAppointment({
                  ...appointment,
                  name: event.target.value,
                })
              }
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={appointment.email}
              onChange={(event) =>
                setAppointment({
                  ...appointment,
                  email: event.target.value,
                })
              }
            />

            <input
              required
              type="tel"
              placeholder="Phone"
              value={appointment.phone}
              onChange={(event) =>
                setAppointment({
                  ...appointment,
                  phone: event.target.value,
                })
              }
            />

            <input
              required
              type="datetime-local"
              value={appointment.appointmentDate}
              onChange={(event) =>
                setAppointment({
                  ...appointment,
                  appointmentDate: event.target.value,
                })
              }
            />

            <textarea
              placeholder="Message"
              value={appointment.message}
              onChange={(event) =>
                setAppointment({
                  ...appointment,
                  message: event.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button className="primary-button" type="submit">
                Request Visit
              </button>

              <button
                type="button"
                onClick={() => setShowAppointment(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
