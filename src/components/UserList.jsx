
import { useState } from "react";
import UserCard from "./UserCard";

function UserList({ users, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobileNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      email: "",
      mobileNo: "",
    });
  };

  const handleSubmit = async (e) => {
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

    setSubmitting(true);

    try {
      const success = await onAdd({
        ...formData,
        age: Number(formData.age),
      });

      if (success) {
        resetForm();
        setShowForm(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="main-container">

      <section className="page-heading">
        <div>
          <h1>User Management</h1>
          <p>Manage and organize your users</p>
        </div>

        <button
          className="add-user-btn"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "✕ Close" : "+ Add User"}
        </button>
      </section>

      <section className="stats-card">
        <div className="stats-icon">♙</div>

        <div>
          <p>Total Users</p>
          <h2>{users.length}</h2>
        </div>
      </section>

      {showForm && (
        <section className="add-user-form">
          <h2>Add New User</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
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

            </div>

            <button
              type="submit"
              className="add-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Add User"}
            </button>
          </form>
        </section>
      )}

      <section className="users-section">
        <div className="users-heading">
          <h2>All Users</h2>
          <span>{users.length} Members</span>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <div>♙</div>
            <h3>No users found</h3>
            <p>Click Add User to create your first user.</p>
          </div>
        ) : (
          <div className="user-grid">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default UserList;
