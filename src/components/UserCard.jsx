
import { useState } from "react";

function UserCard({ user, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
    age: user.age ?? "",
    email: user.email || "",
    mobileNo: user.mobileNo || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      age: user.age ?? "",
      email: user.email || "",
      mobileNo: user.mobileNo || "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      age: user.age ?? "",
      email: user.email || "",
      mobileNo: user.mobileNo || "",
    });

    setIsEditing(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.age ||
      Number(formData.age) <= 0 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
      !/^\d{10}$/.test(formData.mobileNo)
    ) {
      alert("Please enter valid user details.");
      return;
    }

    setSaving(true);

    try {
      const success = await onUpdate(user.id, {
        ...formData,
        age: Number(formData.age),
      });

      if (success) {
        setIsEditing(false);
      }
    } finally {
      setSaving(false);
    }
  };

  const initial = user.name
    ? user.name.charAt(0).toUpperCase()
    : "?";

  if (isEditing) {
    return (
      <article className="user-card editing-card">
        <div className="card-top">
          <h3>Edit User</h3>
          <span className="edit-label">EDIT MODE</span>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              type="number"
              min="1"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              name="mobileNo"
              type="tel"
              maxLength="10"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="10 digit mobile number"
              required
            />
          </div>

          <div className="card-actions">
            <button
              type="submit"
              className="update-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="user-card">
      <div className="card-top">
        <div className="user-avatar">{initial}</div>
        <span className="active-badge">Active</span>
      </div>

      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>

      <div className="user-details">
        <div className="detail-row">
          <span>Age</span>
          <strong>{user.age}</strong>
        </div>

        <div className="detail-row">
          <span>Mobile</span>
          <strong>{user.mobileNo}</strong>
        </div>
      </div>

      <div className="card-actions">
        <button
          className="edit-btn"
          onClick={handleEdit}
        >
          ✎ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default UserCard;
