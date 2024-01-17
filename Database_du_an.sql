Create database DU_AN_WEBSITE_BAN_AO_PHONG_SIMPLE
USE DU_AN_WEBSITE_BAN_AO_PHONG_SIMPLE
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create table [mau_sac](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [kich_thuoc](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [chat_lieu](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [phong_cach](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [hoa_tiet](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [san_pham](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    mo_ta nvarchar(50),
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [tay_ao](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )
Create table [co_ao](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) ,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [san_pham_chi_tiet](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
	so_luong int,
	don_gia decimal(20,0),
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
	hinh_anh varchar(200),
    da_xoa bit,
    san_pham_id UNIQUEIDENTIFIER REFERENCES san_pham(id),
    chat_lieu_id UNIQUEIDENTIFIER REFERENCES chat_lieu(id),
    hoa_tiet_id UNIQUEIDENTIFIER REFERENCES hoa_tiet(id),
    phong_cach_id UNIQUEIDENTIFIER REFERENCES phong_cach(id),
    tay_ao_id UNIQUEIDENTIFIER REFERENCES tay_ao(id),
    co_ao_id UNIQUEIDENTIFIER REFERENCES co_ao(id),
    mau_sac_id UNIQUEIDENTIFIER REFERENCES mau_sac(id),
    kich_thuoc_id UNIQUEIDENTIFIER REFERENCES kich_thuoc(id)
    )

	Create table [khach_hang](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) not null,
    ho_ten nvarchar(70) not null,
    so_dien_thoai varchar(15),
    email varchar(30),
    gioi_tinh bit,
    ngay_sinh date,
    anh_dai_dien varchar(max),
    mat_khau varchar(20),
	reset_token nvarchar(250),
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit,
    )

	Create table [gio_hang](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20),
    ten nvarchar(50),
    ngay_cap_nhat datetime,
    ghi_chu nvarchar(max),
    khach_hang_id UNIQUEIDENTIFIER REFERENCES khach_hang(id)
    )

	

Create table [gio_hang_chi_tiet](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    so_luong int,
    don_gia decimal (20,0),
    don_gia_sau_khuyen_mai decimal(20,0),
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    ghi_chu nvarchar(50),
    san_pham_chi_tiet_id UNIQUEIDENTIFIER REFERENCES san_pham_chi_tiet(id),
    gio_hang_id UNIQUEIDENTIFIER REFERENCES gio_hang(id)
    )



Create table [dia_chi](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    dia_chi_mac_dinh bit,
    dia_chi_cu_the nvarchar(70),
    tinh_thanh_pho nvarchar(20),
    quan_huyen nvarchar(20),
    phuong_xa nvarchar(20),
	ngay_tao datetime,
	ngay_sua datetime,
	nguoi_tao nvarchar(250),
	nguoi_sua nvarchar(250),
    da_xoa bit,
	ten_khach_hang nvarchar(70),
	so_dien_thoai_khach_hang varchar(15),
    khach_hang_id UNIQUEIDENTIFIER REFERENCES khach_hang(id),
    )


	Create table [chuc_vu](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) not null,
    ten nvarchar(50) not null,
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
    da_xoa bit
    )

Create table [nhan_vien](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20) not null,
    ho_ten nvarchar(70) not null,
    so_dien_thoai varchar(15),
    email varchar(30),
    gioi_tinh bit,
    ngay_sinh date,
    anh_dai_dien varchar(max),
    mat_khau varchar(20),
    ngay_tao datetime,
    ngay_sua datetime,
    nguoi_tao nvarchar(50),
    nguoi_sua  nvarchar(50),
	dia_chi_cu_the nvarchar(70),
    tinh_thanh_pho nvarchar(20),
    quan_huyen nvarchar(20),
    phuong_xa nvarchar(20),
    da_xoa bit,
    chuc_vu_id UNIQUEIDENTIFIER REFERENCES chuc_vu(id)
    )

Create table [hoa_don](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ma varchar(20),
	ten_khach_hang nvarchar(70),
	loai_hoa_don nvarchar(50),
    ngay_dat_hang datetime,
    ngay_thanh_toan datetime,
    ngay_ship datetime,
    ngay_mong_muon_nhan datetime,
    ngay_co_the_nhan datetime,
    ngay_nhan_duoc_hang datetime,
    dia_chi_khach_hang nvarchar(max),
    so_dien_thoai_khach_hang varchar(15),
    phi_ship decimal(20,0),
    phu_phi decimal(20,0),
    phi_hoan_tra decimal(20,0),
    trang_thai int,
    tong_tien decimal(20,0),
    ngay_tao datetime,
    nguoi_tao nvarchar(50),
    khach_hang_id UNIQUEIDENTIFIER REFERENCES khach_hang(id),
    nhan_vien_id UNIQUEIDENTIFIER REFERENCES nhan_vien(id),
    )

Create table [hoa_don_chi_tiet](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    so_luong int,
    don_gia decimal(20,0),
    thanh_tien decimal(20,0),
	ngay_tao datetime,
	nguoi_tao nvarchar(75),
	ngay_sua datetime,
	nguoi_sua nvarchar(75),
    hoa_don_id UNIQUEIDENTIFIER REFERENCES hoa_don(id),
    san_pham_chi_tiet_id UNIQUEIDENTIFIER REFERENCES  san_pham_chi_tiet(id)
    )

Create table [lich_su_hoa_don](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    noi_dung nvarchar(50),
<<<<<<< HEAD
    ngay_sua datetime,
=======
>>>>>>> 2b39d6cd302a36d96e3b5d5a4a941efc468ef8b8
	ngay_tao datetime,
    nguoi_tao nvarchar(50),
    trang_thai_hoa_don int,
    hoa_don_id UNIQUEIDENTIFIER REFERENCES hoa_don(id),
  )
<<<<<<< HEAD

Create table [hinh_thuc_thanh_toan](
    id UNIQUEIDENTIFIER
    DEFAULT NEWID() PRIMARY KEY,
    ten nvarchar(50),
    ngay_tao datetime,
    mo_ta nvarchar(50),
    trang_thai int,
    ghi_chu nvarchar(50),
    hoa_don_id UNIQUEIDENTIFIER REFERENCES hoa_don(id),
    )
=======
  drop table lich_su_hoa_don
  drop table hinh_thuc_thanh_toan
>>>>>>> 2b39d6cd302a36d96e3b5d5a4a941efc468ef8b8

Create table  ma_giam_gia(
        id UNIQUEIDENTIFIER
            DEFAULT NEWID() PRIMARY KEY,
        ma varchar(20),
        ten nvarchar(50),
        so_luong int,
        hinh_thuc_giam int,
        trang_thai int,
        gia_tri_giam decimal(20,0),
        gia_tri_don_toi_thieu decimal(20,0),
        gia_tri_giam_toi_da decimal(20,0),
        ngay_bat_dau datetime,
        ngay_ket_thuc datetime,
        ngay_tao datetime,
        ngay_sua datetime,
        nguoi_tao nvarchar(50),
        nguoi_sua  nvarchar(50),
        da_xoa bit
)
Create table  ma_giam_gia_chi_tiet(
        id UNIQUEIDENTIFIER
            DEFAULT NEWID() PRIMARY KEY,
        don_gia decimal(20,0),
        don_gia_sau_khi_giam decimal (20,0),
        ma_giam_gia_id  UNIQUEIDENTIFIER REFERENCES ma_giam_gia(id),
        hoa_don_id UNIQUEIDENTIFIER REFERENCES hoa_don(id),
)




