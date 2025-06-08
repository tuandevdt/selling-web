import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../store/movieSlice'

function ManageMovies() {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movie)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  if (loading) return (
    <div className="bg-white shadow rounded-lg p-6 flex justify-center items-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  )
  
  if (error) return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="bg-red-50 p-4 rounded text-red-600">Error: {error}</div>
    </div>
  )

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Quản lý phim</h1>
            <p className="mt-1 text-sm text-gray-500">
              Danh sách tất cả các phim
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Thêm phim mới
            </button>
          </div>
        </div>
      </div>

      {/* Mobile view: Card layout */}
      <div className="sm:hidden">
        <div className="px-4 py-3">
          {movies.map((movie) => (
            <div key={movie.id} className="border-b border-gray-200 py-4 last:border-b-0">
              <h2 className="text-lg font-medium text-gray-900">{movie.title}</h2>
              <div className="mt-2 flex justify-between text-sm">
                <div className="text-gray-500">
                  <span className="font-medium text-gray-900">{movie.genre}</span>
                </div>
                <div className="text-gray-500">
                  <span className="font-medium text-gray-900">{movie.releaseDate}</span>
                </div>
              </div>
              <div className="mt-3 flex justify-end space-x-4">
                <button className="text-indigo-600 hover:text-indigo-900 font-medium">
                  Sửa
                </button>
                <button className="text-red-600 hover:text-red-900 font-medium">
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view: Table layout */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Tên phim</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Thể loại</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Ngày phát hành</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Tuỳ chọn</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movie.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movie.releaseDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</button>
                    <button className="text-red-600 hover:text-red-900">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageMovies 