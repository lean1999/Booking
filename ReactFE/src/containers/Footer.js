import React from "react";
import './Footer.scss';
class Footer extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        return (
            <>
                <div className="font-small pt-4 mt-4" color="red" >
                    <div fluid className="text-center text-md-left">

                        <div className="content-footer">
                            <div md="4" className="contact-location-booking">
                                <h5 className="title" style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                                    {/* <Icon.GeoAlt size={30} color="white" className=" mb-1" /> */}
                                    Địa Chỉ Liên Hệ</h5>

                                <p className="content-footer-contact m-1" style={{ fontSize: '15px', color: 'white', padding: '10px' }}>
                                    <span className="text-content-footer-contact">CHI NHÁNH TP. HỒ CHÍ MINH</span>
                                    <br></br>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3511596167095!2d106.7440271152603!3d10.784393761994389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed2ffffffff%3A0x1e479a207d5c2285!2sIIG%20Vi%E1%BB%87t%20Nam%20-%20Chi%20nh%C3%A1nh%20TPHCM!5e0!3m2!1svi!2s!4v1657523087155!5m2!1svi!2s"
                                        width="520" height="200" className="mt-3 mb-4" style={{ borderRadius: '5px' }} />
                                    <br></br>
                                    <span className="text-content-footer-contact">Tầng 1, Tháp 1, The Sun Avenue, 28 Mai Chí Thọ, An Phú, TP.Thủ Đức, TP.HCM</span>
                                </p>
                            </div>
                            <div md="3" className="contact-booking">
                                <h5 className="title" style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                                    {/* <Icon.Envelope size={30} color="white" className=" mb-1 mr-3" /> */}
                                    Địa Chỉ Email</h5>
                                <span className="content-footer-more" style={{ fontSize: '15px', color: 'white' }}>
                                    anlnd70@wru.vn</span>
                                <h5 className="title" style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                                    {/* <Icon.TelephoneInbound size={30} color="white" className=" mb-1 mr-3" /> */}
                                    Liên Hệ Với Chúng Tôi Qua</h5>
                                <span className=" content-footer-more hot-line " style={{ fontSize: '15px', color: 'white' }}>
                                    Hotline: 0335138167
                                </span>
                            </div>
                            <div md="3" className="connect-booking">
                                <h5 className="title" style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>
                                    {/* <Icon.Globe size={30} color="white" className=" mb-1 mr-3" /> */}
                                    Kết Nối Với Chúng Tôi</h5>
                                <div className="contact-with" style={{ display: 'grid' }}>
                                    <a href="https://www.facebook.com/profile.php?id=100028034513044" style={{ padding: '5px', color: 'white', textDecoration: 'none' }}>
                                        {/* <Icon.Facebook size={50} color="#0d8af0" style={{ background: 'white' }} className="rounded-circle m-2" /> */}
                                        {
                                            '  '
                                        }Facebook
                                    </a>
                                    <a href="https://www.facebook.com/profile.php?id=100028034513044" style={{ padding: '5px', color: 'white', textDecoration: 'none' }}>
                                        {/* <Icon.Messenger href="https://www.facebook.com/messages/t/100005880064567/" size={50} color="#874189" style={{ background: 'none' }} className="rounded-circle m-2" /> */}
                                        {
                                            '  '
                                        }Messenger
                                    </a>

                                    <a href="https://www.facebook.com/profile.php?id=100028034513044" style={{ padding: '5px', color: 'white', textDecoration: 'none' }} className="rounded-circle m-2">
                                        {/* <Icon.Twitter size={50} color="#0d8af0" /> */}
                                        {
                                            '  '
                                        }
                                        Twiter
                                    </a>
                                </div>


                            </div>
                            <div md="2" className="work-booking">
                                <h5 className="title" style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', textAlign: 'left' }}>
                                    {/* <Icon.Alarm size={30} color="white" className=" mb-1 mr-3" /> */}
                                    Thời Gian Làm Việc</h5>
                                <p className="content-footer m-3 " style={{ fontSize: '15px', color: 'white' }}>
                                    Sáng: 08:00 - 12:00</p>
                                <p className="content-footer m-3 " style={{ fontSize: '15px', color: 'white' }}>
                                    (Thứ Hai - thứ Bảy)</p>
                                <p className="content-footer m-3 " style={{ fontSize: '15px', color: 'white' }}>
                                    Chiều: 13:30 - 17:30</p>
                                <p className="content-footer m-3 " style={{ fontSize: '15px', color: 'white' }}>
                                    (Thứ Hai - Thứ Sáu)</p>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright text-center py-3">
                        <div fluid>
                            <span className="copyright">&copy; {new Date().getFullYear()} Copyright: by BOOKING CARE 2022. All rights reserved.</span>
                            <br></br>
                            <span className="copyright">Designed and Developed by Lê Nam Đại An</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Footer;