import React, { useState } from 'react';
import { CLASSES } from '../constants';
import { User, ClassName } from '../types';
import Button from './Button';
import { BookOpen } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState<ClassName>(CLASSES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ name: name.trim(), className });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-pink-100">
        <div className="text-center mb-8">
          <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Selamat Datang</h1>
          <p className="text-gray-500 mt-2">Kuiz Sejarah Tingkatan 3 Bab 3</p>
          <p className="text-pink-400 text-sm font-medium mt-1">Pentadbiran Negeri-Negeri Melayu Bersekutu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Penuh
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-pink-50/30 placeholder:text-gray-400 text-gray-900"
              placeholder="Masukkan nama anda"
            />
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
              Kelas
            </label>
            <select
              id="class"
              value={className}
              onChange={(e) => setClassName(e.target.value as ClassName)}
              className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all bg-white text-gray-900"
            >
              {CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" fullWidth>
            Mula Kuiz
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;