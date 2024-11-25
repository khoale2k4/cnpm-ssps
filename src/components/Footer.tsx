"use client";
const Footer: React.FC = () => {
  //const { data: session } = useSession();
  return 0 ? (
    <>
      {
        <footer className="mt-10 text-center text-gray-600 text-sm">
          <p>
            Bản quyền © Nhóm LocalHost3000 - Công Nghệ Phần Mềm - Học kì 241 -
            Đại học Bách Khoa Tp.HCM.
          </p>
        </footer>
      }
    </>
  ) : (
    <>
      {
        <footer className="mt-10 text-center text-gray-600 text-sm">
          <p>
            Bản quyền © 2011 - 2012 Đại học Bách Khoa Tp.HCM. Được hỗ trợ bởi
            Jasig CAS 3.5.1
          </p>
        </footer>
      }
    </>
  );
};
export default Footer;
