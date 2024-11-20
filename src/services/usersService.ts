
import http from './http';
import { User } from '@/types/types'

export const fetchUsers = async () => {
  try {
    const response = await http.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

export const addUser = async (user: User) => {
  try {
    const { _id, ...userData } = user; 
    const response = await http.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

export const updateUser = async (id: string, user: User) => {
  try {
    const { _id, ...userData } = user;
    const response = await http.patch(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await http.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};