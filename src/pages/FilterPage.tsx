import { useLoaderData, useSearchParams } from 'react-router-dom';
import type { FilterLoaderData } from './FilterLoader';
import Logo from '../../public/content/logo.png';
import Province from '../../public/icon/icon-province.png';
import City from '../../public/icon/icon-city.png';
import District from '../../public/icon/icon-district.png';
import Reset from '../../public/icon/icon-reset.png';
import Arrow from '../../public/icon/icon-arrow.png';

export default function FilterPage() {
  const { provinces, regencies, districts } =
    useLoaderData() as FilterLoaderData;

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedProvince = searchParams.get('province');
  const selectedRegency = searchParams.get('regency');
  const selectedDistrict = searchParams.get('district');

  const filteredRegencies = regencies.filter(
    (r) => r.province_id === Number(selectedProvince)
  );

  const filteredDistricts = districts.filter(
    (d) => d.regency_id === Number(selectedRegency)
  );

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      province: e.target.value,
    });
  };

  const handleRegencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      province: selectedProvince || '',
      regency: e.target.value,
    });
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({
      province: selectedProvince || '',
      regency: selectedRegency || '',
      district: e.target.value,
    });
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className='flex '>
      {/* Sidebar Filter */}
      <div className='w-96 space-y-4 bg-[#f9fafc] border-r border-[#e5e7eb] h-screen px-7'>
        <div className='h-20 flex items-end justify-center mb-14'>
          <img
            src={Logo}
            width={300}
            height={56}
            alt='logo'
            className='block shrink-0 max-w-full'
          />
        </div>
        <div className='font-semibold text-sm text-[#969cac]'>
          FILTER WILAYAH
        </div>

        {/* Province */}
        <div className='flex flex-col gap-8 !mt-11'>
          <div>
            <h2 className='font-semibold text-[#696f87] mb-4'>PROVINSI</h2>
            <div className='w-full border border-[#70727f] p-4 rounded-xl flex gap-2'>
              <img src={Province} width={30} height={30} alt='icon' />
              <select
                name='province'
                value={selectedProvince || ''}
                onChange={handleProvinceChange}
                className='w-full border-0 px-2 rounded bg-transparent font-semibold outline-none cursor-pointer'
              >
                <option value=''>Provinsi</option>
                {provinces.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Regency */}
          <div>
            <h2 className='font-semibold text-[#696f87] mb-4'>
              KOTA/KABUPATEN
            </h2>
            <div className='w-full border border-[#70727f] p-4 rounded-xl flex gap-2'>
              <img src={City} width={30} height={30} alt='icon' />
              <select
                name='regency'
                value={selectedRegency || ''}
                onChange={handleRegencyChange}
                disabled={!selectedProvince}
                className='w-full border-0 px-2 rounded bg-transparent outline-none font-semibold cursor-pointer'
              >
                <option value=''>Kota/Kabupaten</option>
                {filteredRegencies.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* District */}
          <div>
            <h2 className='font-semibold text-[#696f87] mb-4'>
              KOTA/KABUPATEN
            </h2>
            <div className='w-full border border-[#70727f] p-4 rounded-xl flex gap-2'>
              <img src={District} width={30} height={30} alt='icon' />
              <select
                name='district'
                value={selectedDistrict || ''}
                onChange={handleDistrictChange}
                disabled={!selectedRegency}
                className='w-full border-0 px-2 rounded bg-transparent outline-none font-semibold cursor-pointer'
              >
                <option value=''>Kecamatan</option>
                {filteredDistricts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className='!mt-16'>
          <button
            onClick={handleReset}
            className='w-full text-[#363e49] font-bold px-2 py-4 rounded-xl flex border-2 border-[#295dc3] items-center justify-center gap-4 text-md bg-[#f2f5fa]'
          >
            <img src={Reset} width={30} height={30} alt='icon' />
            RESET
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1'>
        <div className='h-20 border-b border-b-[#e5e7eb] flex items-center '>
          <nav className='breadcrumb text-md px-8 font-semibold '>
            <ul className='flex gap-4 text-[#979fb4]'>
              <li className='last:text-[#4989ea]'>
                {selectedProvince &&
                  provinces.find((p) => p.id === Number(selectedProvince))
                    ?.name}
              </li>
              <li className='last:text-[#4989ea] flex items-center gap-3'>
                {selectedRegency && (
                  <>
                    <img src={Arrow} width={6} height={10} alt='arrow' />
                    {
                      regencies.find((r) => r.id === Number(selectedRegency))
                        ?.name
                    }
                  </>
                )}
              </li>
              <li className='last:text-[#4989ea] flex items-center gap-3'>
                {selectedDistrict && (
                  <>
                    <img src={Arrow} width={6} height={10} alt='arrow' />
                    {
                      districts.find((d) => d.id === Number(selectedDistrict))
                        ?.name
                    }
                  </>
                )}
              </li>
            </ul>
          </nav>
        </div>

        <main className=''>
          <div className='min-h-[calc(100vh-80px)] overflow-y-auto flex flex-col items-center justify-center gap-20'>
            <div className='text-7xl font-bold text-center'>
              <h2 className='text-[#4989ea] font-semibold text-xl'>PROVINSI</h2>
              {selectedProvince &&
                provinces.find((p) => p.id === Number(selectedProvince))?.name}
            </div>

            <div className='text-6xl font-semibold mt-6 text-center'>
              <h2 className='text-[#4989ea] font-semibold text-xl'>
                KOTA / KABUPATEN
              </h2>
              {selectedRegency &&
                regencies.find((r) => r.id === Number(selectedRegency))?.name}
            </div>

            <div className='text-4xl font-semibold mt-6 text-center'>
              <h2 className='text-[#4989ea] font-semibold text-xl'>
                KECAMATAN
              </h2>
              {selectedDistrict &&
                districts.find((d) => d.id === Number(selectedDistrict))?.name}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
