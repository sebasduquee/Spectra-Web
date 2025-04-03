import React, { useState, useEffect } from "react";
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
  UserX,
  RefreshCw
} from "lucide-react";
import AdminLayout from "../components/layout/AdminLayout";
import EditUserView from "../components/users/EditUserView";
import DeleteUserModal from "../components/users/DeleteUserModal";
import UserPermissionsModal from "../components/users/UserPermissionsModal";
import InitialCredentialsModal from "../components/users/InitialCredentialsModal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import { TableRowSkeleton } from "../../components/ui/SkeletonLoader";
import { useToast } from "../../contexts/ToastContext";

// Componente de tabla de usuarios
const UsersTable = ({ users, onEdit, onDelete, onPermissions, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto rounded-xl border border-white/10 p-4">
        <div className="bg-white/5 px-6 py-4 flex">
          <div className="w-1/4"><div className="h-6 bg-white/10 rounded w-3/4"></div></div>
          <div className="w-1/4"><div className="h-6 bg-white/10 rounded w-3/4"></div></div>
          <div className="w-1/6"><div className="h-6 bg-white/10 rounded w-3/4"></div></div>
          <div className="w-1/6"><div className="h-6 bg-white/10 rounded w-3/4"></div></div>
          <div className="w-1/6"><div className="h-6 bg-white/10 rounded w-3/4"></div></div>
          <div className="w-1/12"><div className="h-6 bg-white/10 rounded w-3/4"></div></div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse px-6 py-4 flex items-center space-x-4 border-t border-white/5">
            <div className="flex items-center space-x-3 w-1/4">
              <div className="w-8 h-8 rounded-lg bg-white/10"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded w-24"></div>
                <div className="h-3 bg-white/10 rounded w-16"></div>
              </div>
            </div>
            <div className="w-1/4"><div className="h-4 bg-white/10 rounded w-32"></div></div>
            <div className="w-1/6"><div className="h-5 bg-white/10 rounded w-16"></div></div>
            <div className="w-1/6"><div className="h-5 bg-white/10 rounded w-16"></div></div>
            <div className="w-1/6"><div className="h-4 bg-white/10 rounded w-20"></div></div>
            <div className="w-1/12 flex justify-end space-x-1">
              <div className="w-8 h-8 rounded bg-white/10"></div>
              <div className="w-8 h-8 rounded bg-white/10"></div>
              <div className="w-8 h-8 rounded bg-white/10"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <EmptyState 
        title="No hay usuarios disponibles"
        description="No se encontraron usuarios en el sistema"
        icon={UserX}
        action={() => onEdit(null)}
        actionLabel="Crear Primer Usuario"
      />
    );
  }

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
            <motion.tr 
              key={user.id} 
              className="hover:bg-white/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Componente principal
const UsersView = () => {
  // Estados de UI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError, showSuccess } = useToast();
  
  // Estados
  const [users, setUsers] = useState([]);
  // Mock de usuarios para simulación
  const mockUsers = [
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
  ];

  // Estados para modales
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [newUserCredentials, setNewUserCredentials] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulamos una llamada API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // En un entorno real, esto sería una llamada a la API:
        // const response = await userService.getUsers();
        // setUsers(response.data);
        
        setUsers(mockUsers);
        setSearchResults(mockUsers);
      } catch (err) {
        const errorMsg = err.message || "Error al cargar usuarios";
        setError(errorMsg);
        showError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults(users);
      return;
    }
    
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(filtered);
  }, [searchTerm, users]);

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

  const generateTempPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowFormModal(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulamos una llamada API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (selectedUser) {
        // Actualizar usuario existente
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? { ...user, ...userData } : user,
          ),
        );
        showSuccess("Usuario actualizado correctamente");
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
        showSuccess("Usuario creado correctamente");
      }
      
      setShowFormModal(false);
    } catch (err) {
      const errorMsg = err.message || "Error al guardar usuario";
      showError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    // Simulamos una nueva carga
    setTimeout(() => {
      setUsers(mockUsers);
      setSearchResults(mockUsers);
      setIsLoading(false);
    }, 1000);
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
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <Plus className="w-5 h-5 mr-2" />
            )}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading || error}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20 disabled:opacity-50"
            />
          </div>
          <button
            disabled={isLoading || error}
            className="inline-flex items-center px-4 py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </button>
        </div>

        {/* Error state */}
        {error ? (
          <ErrorState 
            message="Error al cargar usuarios" 
            details={error}
            onRetry={handleRetry}
            fullPage
          />
        ) : (
          <>
            {/* Empty search results */}
            {!isLoading && searchTerm && searchResults.length === 0 ? (
              <EmptyState 
                title="No se encontraron resultados"
                description={`No hay coincidencias para "${searchTerm}"`}
                icon={Search}
                action={() => setSearchTerm("")}
                actionLabel="Limpiar búsqueda"
              />
            ) : (
              /* Users Table */
              <UsersTable
                users={searchResults}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPermissions={handlePermissions}
                isLoading={isLoading}
              />
            )}
          </>
        )}

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
            try {
              setUsers(users.filter((user) => user.id !== selectedUser?.id));
              showSuccess(`Usuario ${selectedUser?.name} eliminado correctamente`);
            } catch (err) {
              showError("Error al eliminar usuario");
            } finally {
              setShowDeleteModal(false);
            }
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
              try {
                console.log("Saving permissions:", permissions);
                showSuccess("Permisos actualizados correctamente");
              } catch (err) {
                showError("Error al actualizar permisos");
              } finally {
                setShowPermissionsModal(false);
              }
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
