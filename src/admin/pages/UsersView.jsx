import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import AdminLayout from "../components/layout/AdminLayout";
import EditUserView from "../components/users/EditUserView";
import DeleteUserModal from "../components/users/DeleteUserModal";
import UserPermissionsModal from "../components/users/UserPermissionsModal";
import InitialCredentialsModal from "../components/users/InitialCredentialsModal";

// Componente de tabla de usuarios
const UsersTable = ({ users, onEdit, onDelete, onPermissions }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full">
        <thead>
          <tr className="bg-white/5">
            <th className="px-6 py-4 text-left text-sm text-white/60">
              Usuario
            </th>
            <th className="px-6 py-4 text-left text-sm text-white/60">Email</th>
            <th className="px-6 py-4 text-left text-sm text-white/60">Plan</th>
            <th className="px-6 py-4 text-left text-sm text-white/60">
              Estado
            </th>
            <th className="px-6 py-4 text-left text-sm text-white/60">
              Última actividad
            </th>
            <th className="px-6 py-4 text-right text-sm text-white/60">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-white/5">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-white text-sm">{user.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-xs text-white/60">
                      @{user.username}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-white">{user.email}</span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${user.plan === "Basic" && "bg-white/10 text-white"}
                              ${user.plan === "Silver" && "bg-[#CBDFF4]/10 text-[#CBDFF4]"}
                              ${user.plan === "Gold" && "bg-yellow-500/10 text-yellow-400"}
                              ${user.plan === "Diamond" && "bg-blue-500/10 text-blue-400"}
                            `}
                >
                  {user.plan}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${user.status === "active" && "bg-green-500/10 text-green-400"}
                              ${user.status === "inactive" && "bg-red-500/10 text-red-400"}
                              ${user.status === "pending" && "bg-yellow-500/10 text-yellow-400"}
                            `}
                >
                  {user.status === "active" && (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  )}
                  {user.status === "inactive" && (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {user.status === "pending" && (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-white/60">{user.lastActive}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => onPermissions(user)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Shield className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Componente principal
const UsersView = () => {
  // Estados
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ana Martínez",
      username: "anamartinez",
      email: "ana@creator.com",
      plan: "Diamond",
      status: "active",
      lastActive: "Hace 5 min",
      avatar: null,
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      username: "carlosr",
      email: "carlos@creator.com",
      plan: "Gold",
      status: "active",
      lastActive: "Hace 1 hora",
      avatar: null,
    },
    {
      id: 3,
      name: "Laura Gómez",
      username: "laurag",
      email: "laura@creator.com",
      plan: "Silver",
      status: "pending",
      lastActive: "Hace 2 días",
      avatar: null,
    },
  ]);

  // Estados para modales
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowFormModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handlePermissions = (user) => {
    setSelectedUser(user);
    setShowPermissionsModal(true);
  };

  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [newUserCredentials, setNewUserCredentials] = useState(null);

  const generateTempPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowFormModal(true);
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      // Actualizar usuario existente
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userData } : user,
        ),
      );
      setShowFormModal(false);
    } else {
      // Crear nuevo usuario
      const tempPassword = generateTempPassword();
      const newUser = {
        id: users.length + 1,
        status: "pending",
        lastActive: "Ahora",
        avatar: null,
        ...userData,
      };
      
      setUsers([...users, newUser]);
      setNewUserCredentials({
        email: userData.email,
        password: tempPassword
      });
      setShowCredentialsModal(true);
      setShowFormModal(false);
    }
  };

  return (
    <AdminLayout>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Usuarios</h1>
            <p className="text-white/60">
              Gestiona los usuarios de la plataforma
            </p>
          </div>
          <button
            onClick={handleCreateUser}
            className="inline-flex items-center px-4 py-2 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Usuario
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
            />
          </div>
          <button className="inline-flex items-center px-4 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </button>
        </div>

        {/* Users Table */}
        <UsersTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPermissions={handlePermissions}
        />

        {/* Modales */}
        <EditUserView
          isOpen={showFormModal}
          onClose={() => setShowFormModal(false)}
          user={selectedUser}
          onSave={handleSaveUser}
          isCreating={!selectedUser}
        />

        <DeleteUserModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setUsers(users.filter((user) => user.id !== selectedUser?.id));
            setShowDeleteModal(false);
          }}
          userName={selectedUser?.name}
        />
      </div>
      {showPermissionsModal && (
        <div className="absolute inset-0">
          <UserPermissionsModal
            isOpen={showPermissionsModal}
            onClose={() => setShowPermissionsModal(false)}
            user={selectedUser}
            onSave={(permissions) => {
              console.log("Saving permissions:", permissions);
              setShowPermissionsModal(false);
            }}
          />
        </div>
      )}
      <InitialCredentialsModal
        isOpen={showCredentialsModal}
        onClose={() => setShowCredentialsModal(false)}
        credentials={newUserCredentials}
      />
      </AdminLayout>
  );
};

export default UsersView;
