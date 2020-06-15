//<script src="assets/js/menu/chc.js"></script>
document.write(`
	<!--  BEGIN SIDEBAR  -->
        <div class="sidebar-wrapper sidebar-theme">

            <nav id="sidebar">
                <div class="shadow-bottom"></div>

                <ul class="list-unstyled menu-categories" id="accordionExample">
                    <li class="menu">
                        <a href="dashboard.html" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                <span>Dashboard</span>
                            </div>
                        </a>
                    </li>
                    <li class="menu">
                        <a href="#anm" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                                <span>ANM / PHC</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="anm" data-parent="#accordionExample">
                            <li>
                                <a href="notification.html"> ANM Notifications </a>
                            </li>
                            <li>
                                <a href="live-screener-entry.html"> Subject Registration </a>
                            </li>
                            <li>
                                <a href="collection.html"> Sample Collection </a>
                            </li>
                            <li>
                                <a href="Completed.html">  ANM Pick and Pack list </a>
                            </li>
                            <li>
                                <a href="shipmentlog.html"> ANM Shipment log  </a>
                            </li>
                            <li>
                                <a href="profile.html"> Subject Profile </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#chc" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle">
                            <div class="">
                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M98.5216,14.0008c-32.7972,0 -59.4776,26.6804 -59.4776,59.4776c0,32.7972 26.6804,59.4776 59.4776,59.4776c32.7972,0 59.4776,-26.6804 59.4776,-59.4776c0,-32.7972 -26.6804,-59.4776 -59.4776,-59.4776zM35.55898,54.64097c-5.69107,9.11886 -9.03658,19.84228 -9.03658,31.35903c0,32.7972 26.6804,59.4776 59.4776,59.4776c11.51674,0 22.24017,-3.34552 31.35903,-9.03659c-5.9728,1.78433 -12.2855,2.77579 -18.83743,2.77579c-36.30638,0 -65.7384,-29.43202 -65.7384,-65.7384c0,-6.55193 0.99146,-12.86462 2.77578,-18.83743zM98.5216,54.696c10.37415,0 18.7824,8.40825 18.7824,18.7824c0,10.37415 -8.40825,18.7824 -18.7824,18.7824c-10.37415,0 -18.7824,-8.40825 -18.7824,-18.7824c0,-10.37415 8.40825,-18.7824 18.7824,-18.7824zM23.03738,67.16257c-5.69107,9.11886 -9.03658,19.84228 -9.03658,31.35903c0,32.7972 26.6804,59.4776 59.4776,59.4776c11.51674,0 22.24017,-3.34552 31.35903,-9.03659c-5.9728,1.78433 -12.2855,2.77579 -18.83743,2.77579c-36.30638,0 -65.7384,-29.43202 -65.7384,-65.7384c0,-6.55193 0.99146,-12.86462 2.77578,-18.83743zM98.5216,67.2176c-3.45774,0 -6.2608,2.80306 -6.2608,6.2608c0,3.45774 2.80306,6.2608 6.2608,6.2608c3.45774,0 6.2608,-2.80306 6.2608,-6.2608c0,-3.45774 -2.80306,-6.2608 -6.2608,-6.2608z"></path></g><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="none"></path><path d="M86,168.56c-45.59663,0 -82.56,-36.96337 -82.56,-82.56v0c0,-45.59663 36.96337,-82.56 82.56,-82.56v0c45.59663,0 82.56,36.96337 82.56,82.56v0c0,45.59663 -36.96337,82.56 -82.56,82.56z" fill="none"></path></g></svg>
                                <span>CHC (CBC & SST)</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse show" id="chc" data-parent="#accordionExample"
                            style="">
                           
                            <li>
                                <a href="#chc-couonsellor" data-toggle="collapse" data-active="true" aria-expanded="false" class="dropdown-toggle"> CHC-Regn & Sampling <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu show" id="chc-couonsellor" data-parent="#chc"> 
                                    <li>
                                        <a href="chc-notification.html">CHC Notifications </a>
                                    </li>
                                    <li>
                                        <a href="chcregistration.html"> Subject Registration </a>
                                    </li>
                                    <li>
                                        <a href="chccollection.html"> Sample Collection </a>
                                    </li>
                                    <li>
                                        <a href="samplepick.html"> Sample Pick & Pack </a>
                                    </li>
                                    <li>
                                        <a href="cbcshipment.html"> Shipment for CBC/SST</a>
                                    </li>
                                    <li>
                                        <a href="subjectprofile.html"> Subject Profile </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#chc-obstetrician" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"> CHC-Sample Rec & Processing <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu" id="chc-obstetrician" data-parent="#chc"> 
                                    <li>
                                        <a href="deliveryconfirm.html"> Confirm Sample Receipt </a>
                                    </li>
                                    <li>
                                        <a href="receivedmanual.html"> Manual Sample Receipt </a>
                                    </li>
                                    <li>
                                        <a href="samplelist.html"> Update CBC Results </a>
                                    </li>
                                    <li>
                                        <a href="testresults.html"> Update SST Results </a>
                                    </li>
                                    <li class="active">
                                        <a href="pickandpack.html"> CHC Pick & Pack </a>
                                    </li>
                                    <li>
                                        <a href="chcshipmentlog.html"> CHC Shipment Log </a>
                                    </li>
                                    <li>
                                        <a href="chcpositivecases.html"> Report of all Samples </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#centrallab" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M67.80416,28.38003c-1.28887,0 -2.43629,0.81554 -2.86086,2.03163c-0.42457,1.21608 -0.03545,2.56963 0.97139,3.37025c2.36242,1.88326 3.97592,4.23701 4.9221,7.18473v50.15685l-29.59183,43.0432c-1.27371,1.85294 -1.41638,4.23881 -0.37316,6.22519c1.04626,1.99244 3.09835,3.22809 5.34856,3.22809h79.55915c2.25021,0 4.29941,-1.23869 5.34264,-3.22809c1.04626,-1.98637 0.90647,-4.37225 -0.36723,-6.22519l-29.59183,-43.0432v-50.42932c0.39727,-3.16 1.76769,-5.20044 4.43641,-6.59242c1.23731,-0.64595 1.87649,-2.05612 1.54593,-3.41171c-0.33662,-1.35862 -1.55166,-2.31001 -2.94971,-2.31001zM74.48542,34.44529h22.34788c-0.90069,1.67098 -1.46917,3.58068 -1.71178,5.72172c-0.01516,0.11524 -0.02369,0.2283 -0.02369,0.34354v51.55471c0,0.61259 0.18736,1.21428 0.53308,1.7177l7.16103,10.41282h-33.584l7.16103,-10.41282c0.34269,-0.50342 0.53308,-1.10511 0.53308,-1.7177v-51.55471c0,-0.29113 -0.04251,-0.57985 -0.12439,-0.85885c-0.55497,-1.88023 -1.3218,-3.61731 -2.29224,-5.20641zM28.37998,52.64107c-1.67704,0 -3.03263,1.35862 -3.03263,3.03263v16.17008c-9.20706,4.24871 -15.09037,13.15299 -15.16315,23.23042c-0.05459,7.35413 2.76358,14.25412 7.92511,19.42778c5.08875,5.09179 11.9062,7.88957 19.20271,7.88957h0.16585h3.03263c0.16679,0.00607 0.39391,0.01185 0.64562,0.01185l23.28372,-33.29969c-1.45263,-8.21236 -8.05367,-14.65466 -14.82553,-17.39616v-16.03384c0,-1.67401 -1.35559,-3.03263 -3.03263,-3.03263zM113.29361,52.64107c-1.67704,0 -3.03263,1.35862 -3.03263,3.03263v23.75165c-0.05413,0.3275 -0.05413,0.66166 0,0.98916v13.61129l19.8424,28.36575h1.38601h21.22841c1.67704,0 3.03263,-1.35862 3.03263,-3.03263v-38.9148c0.05413,-0.3275 0.05413,-0.66166 0,-0.98916v-14.59453c0.07582,-2.55044 1.90904,-5.26725 4.35941,-6.46211c1.26764,-0.61866 1.94425,-2.02897 1.62885,-3.40579c-0.31843,-1.37681 -1.54242,-2.35147 -2.95563,-2.35147zM31.41261,58.70633h12.13052v15.16315c0,1.35559 0.89937,2.54708 2.20339,2.92009c3.33836,0.94986 6.73274,3.18745 9.21043,6.1778h-34.37178c2.22115,-2.73754 5.22173,-4.91199 8.84912,-6.2548c1.18576,-0.44276 1.97832,-1.57545 1.97832,-2.84309zM116.32624,58.70633h35.08255c-1.04019,1.859 -1.65994,3.94545 -1.72362,6.06526v12.13052h-33.35893z"></path></g></g></svg>
                                <span>CENTRAL LAB (HPLC TEST)</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="centrallab" data-parent="#accordionExample" style="">
                            <li>
                                <a href="centraldelivery.html"> Confirm sample received at Central Lab </a>
                            </li>
                            <li>
                                <a href="centralsample.html"> Update HPLC test results </a>
                            </li>
                            <li>
                                <a href="centralpickpack.html"> Central Pick & Pack </a>
                            </li>
                            <li>
                                <a href="centralshipmentlog.html"> Central Shipment log </a>
                            </li>
                            <li>
                                <a href="centralpositive.html"> Report of all samples  </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#molecularlab" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                                <div class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M110.9252,20.59097c-2.39834,0 -4.79664,0.90823 -6.60848,2.72006c-2.98793,2.98793 -3.4669,7.55174 -1.52737,11.09932l-78.77235,78.77234c-8.73614,8.73614 -8.73614,22.94927 0,31.68541c4.36807,4.36807 10.10681,6.54763 15.84575,6.54763c5.73894,0 11.47159,-2.17644 15.83966,-6.54763l78.76626,-78.76626c1.40095,0.77229 2.94515,1.20486 4.49693,1.20486c2.38626,0 4.79679,-0.92663 6.60848,-2.73832c3.62367,-3.62367 3.62367,-9.59329 0,-13.21696l-28.0404,-28.0404c-1.81184,-1.81184 -4.21014,-2.72006 -6.60848,-2.72006zM110.9252,26.78566c0.79069,0 1.58138,0.30958 2.20283,0.93103l28.0404,28.0404c1.2429,1.2429 1.2429,3.16275 0,4.40565c-0.62471,0.62471 -1.39871,0.91277 -2.20283,0.91277c-0.80412,0 -1.57812,-0.28807 -2.20283,-0.91277l-0.37728,-0.37728l-13.01615,-13.01615l-4.40565,4.40565l10.81332,10.81332l-11.55571,11.54963h-45.7482l34.42373,-34.42981l3.24947,3.24947l4.41174,-4.40565l-5.45839,-5.4523l-0.37728,-0.37728c-1.2429,-1.2429 -1.2429,-3.16276 0,-4.40565c0.62145,-0.62145 1.41214,-0.93103 2.20283,-0.93103zM138.9656,92.2802c-0.87159,0 -1.74318,0.3342 -2.3367,1.00405c-1.35529,1.53599 -13.2413,15.27058 -13.2413,24.49275c0,8.58971 6.98829,15.578 15.578,15.578c8.58971,0 15.578,-6.98829 15.578,-15.578c0,-9.22218 -11.88601,-22.95676 -13.2413,-24.49275c-0.59352,-0.66985 -1.46511,-1.00405 -2.3367,-1.00405z"></path></g></g></svg>
                                    <span>MOLECULAR LAB
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="molecularlab" data-parent="#accordionExample">
                            <li>
                                <a href="geneticlabdelivery.html"> Confirm sample received </a>
                            </li>
                            <li>
                                <a href="geneticlabsamplelist.html"> Sample received at molecular lab </a>
                            </li>
                            <li>
                                <a href="genetictestresults.html"> Update molecular test results </a>
                            </li>
                            
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#pndtc" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M70.51503,26.66507c0,-8.63306 7.00672,-15.63977 15.63977,-15.63977c8.63306,0 15.63977,7.00671 15.63977,15.63977c0,8.63305 -7.00671,15.63977 -15.63977,15.63977c-8.63305,0 -15.63977,-7.00672 -15.63977,-15.63977zM154.97469,123.64633v33.46838c0,3.90077 -3.28936,7.20236 -7.19014,7.20236h-4.37767c-3.58284,0 -6.6521,-2.78801 -7.129,-6.2608h-0.07337c0,-1.72416 -1.394,-3.1304 -3.1304,-3.1304h-15.68868l-0.30571,1.77308c-0.81928,4.54886 -4.57332,7.71595 -9.10995,7.71595c-0.56249,0 -1.13721,-0.06114 -1.72416,-0.15896c-2.48231,-0.45244 -4.63446,-1.80976 -6.0407,-3.83963c-1.12499,-1.61411 -1.66302,-3.5217 -1.61411,-5.49043h-25.17771c0.06114,1.88313 -0.46467,3.83963 -1.62634,5.49043c-1.40623,2.02987 -3.54615,3.38719 -6.02846,3.83963c-5.24586,0.95379 -9.90478,-2.4334 -10.83412,-7.5203l-0.30571,-1.80976h-12.26481c-1.72417,0 -3.11817,1.40624 -3.11817,3.1304h-0.07337c-0.47689,3.47279 -3.54615,6.2608 -7.12899,6.2608h-4.37767c-3.90077,0 -7.19014,-3.30159 -7.19014,-7.20236v-33.46838c0,-8.63306 7.00671,-15.63977 15.63977,-15.63977h11.46998c0.12228,-0.41576 0.26902,-0.83151 0.44021,-1.22281c0.0856,0.07337 0.15897,0.15896 0.24456,0.23234l0.52581,0.45244l0.61141,0.31793c3.3505,1.7364 5.99178,2.75133 8.8287,3.39942l26.93856,5.49043c1.01494,0.26902 2.06655,0.40353 3.11817,0.40353c2.27443,0 4.43881,-0.63586 6.29748,-1.77308l6.79884,-1.30841l9.15887,-1.76085c3.85186,-0.83151 8.70643,-2.49454 8.90208,-2.55568l0.46467,-0.15896l0.42799,-0.23234c0.7826,-0.41575 1.50406,-0.85597 2.18884,-1.35732c0.08559,0.11006 0.14674,0.23234 0.2201,0.34239c0.3913,-0.17119 0.81929,-0.26902 1.27172,-0.26902h15.32184c8.62083,0 15.63977,7.00671 15.63977,15.63977zM53.55462,148.66507l-5.80836,-34.40994h-11.64118c-5.1725,0 -9.3912,4.2187 -9.3912,9.3912v33.46838c0,0.46467 0.4769,0.94156 0.94156,0.94156h4.37767c0.46467,0 0.94156,-0.4769 0.94156,-0.94156h0.04891c0.46467,-4.73229 4.47549,-8.44964 9.33006,-8.44964zM70.14819,122.90041l2.6535,25.76466h26.37606l2.38449,-24.9576l-15.49304,-4.65891zM148.72611,123.64633c0,-5.1725 -4.2187,-9.3912 -9.3912,-9.3912h-15.01614c-0.03668,0.20788 -0.01223,0.3913 -0.04891,0.6114l-5.80836,33.79854h14.61261c4.8668,0 8.86539,3.71735 9.34229,8.44964h0.04891c0,0.46467 0.4769,0.94156 0.94157,0.94156h4.37767c0.46467,0 0.94156,-0.4769 0.94156,-0.94156zM52.2829,102.23488c2.54345,1.32064 4.79343,2.27443 7.32464,2.84915l27.03639,5.50266c0.53804,0.17119 1.0883,0.24456 1.63857,0.24456c2.60459,0 5.0869,-1.77308 5.8695,-4.62223l0.11005,-0.44021c0.57472,-3.38719 -1.57743,-6.39531 -4.61,-7.03117c-4.12088,-0.92934 -22.65872,-5.20918 -22.65872,-5.20918c-1.63857,-0.37907 -2.67796,-1.96873 -2.37225,-3.61953l2.18884,-11.88574c0.31793,-1.69971 1.93204,-2.8247 3.64398,-2.50676c1.69971,0.3057 2.8247,1.94427 2.50676,3.64398l-1.63857,8.93876c4.42658,1.02716 12.80285,2.9592 17.36394,3.9986l12.69279,-2.98366l-2.59236,-9.70913c-0.45244,-1.67525 0.53804,-3.38719 2.20106,-3.83963c1.67526,-0.44021 3.38719,0.53804 3.83963,2.21329l3.4361,12.8273c0.22011,0.81929 0.09783,1.69971 -0.33016,2.40894c-0.42798,0.73369 -1.13721,1.24727 -1.96873,1.44292l-8.44964,1.99319c0.24456,0.28124 0.48913,0.55026 0.70923,0.84374c2.00541,2.7391 2.80024,6.11406 2.23775,9.51348l-0.04891,0.28125l-0.07337,0.28125l-0.13451,0.48913l9.14664,-1.76085c3.39942,-0.73369 8.05834,-2.33557 8.05834,-2.33557c1.84645,-0.97825 3.31382,-2.22552 4.27985,-3.81517c1.55297,-2.50676 1.88313,-5.53934 1.0027,-8.85316c-1.18613,-5.62494 -6.28525,-27.64779 -7.93605,-32.63686c-2.24998,-6.28526 -7.20236,-9.89255 -13.58545,-9.89255h-30.65591c-4.46326,0 -10.3939,1.71194 -13.26751,9.88032c-0.57472,1.57743 -1.45515,5.41706 -2.9592,12.05693c-1.62634,7.14123 -3.64398,16.0433 -5.22141,20.93455c-0.84374,2.75133 -0.52581,5.63716 0.89265,8.10725c0.59918,1.03939 1.40624,1.91981 2.32335,2.69019z"></path></g></g></svg>
                                <span>PNDTC</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="pndtc" data-parent="#accordionExample"
                            style="">
                           
                            <li>
                                <a href="#pndtc-couonsellor" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"> Counsellor <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu" id="pndtc-couonsellor" data-parent="#pndtc"> 
                                    <li>
                                        <a href="counsellorschedule.html"> Counselling Scheduler </a>
                                    </li>
                                    <li>
                                        <a href="counsellorsubjectlist.html"> Pre test counselling </a>
                                    </li>
                                    <li>
                                        <a href="Post-test-counselling.html"> Post test counselling </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#pndtc-obstetrician" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"> Lab Obstetrician <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu" id="pndtc-obstetrician" data-parent="#pndtc"> 
                                    <li>
                                        <a href="obspndtc.html"> PND </a>
                                    </li>
                                    <li>
                                        <a href="obsmtp.html"> MTP </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#pathologist" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M30.7364,14.3104v143.9984h84.63697c5.22449,3.90961 11.67721,6.2608 18.66623,6.2608c17.2172,0 31.304,-14.0868 31.304,-31.304c0,-13.94748 -9.24861,-25.83462 -21.9128,-29.84885v-49.70733l-39.39902,-39.39902zM105.866,24.99778l26.87742,26.87742h-26.87742zM130.9092,108.4425v24.8231c0.00017,1.7288 1.4016,3.13023 3.1304,3.1304h24.8231c-1.55623,12.30674 -12.11171,21.9128 -24.8231,21.9128c-13.77376,0 -25.0432,-11.26944 -25.0432,-25.0432c0,-12.71138 9.60606,-23.26687 21.9128,-24.8231zM137.17,108.4425c11.27818,1.42616 20.26653,10.41451 21.6927,21.6927h-21.6927z"></path></g></g></svg>
                                <span>PATHOLOGIST</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="pathologist" data-parent="#accordionExample"
                            style="">
                            <li>
                                <a href="pathosubject.html"> List of subjects </a>
                            </li>
                            <li>
                                <a href="pathoreport.html"> Report </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#birthmonitoring" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                                <span>BIRTH MONITORING</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="birthmonitoring" data-parent="#accordionExample" style="">
                            <li>
                                <a href="infantregistration.html"> Infant registration </a>
                            </li>
                            <li>
                                <a href="infantcollection.html"> Infant collection </a>
                            </li>
                            <li>
                                <a href="infantpickpack.html"> Pick and Pack </a>
                            </li>
                            <li>
                                <a href="infantprofile.html"> Infant profile </a>
                            </li>
                            <li>
                                <a href="sentinelpending.html"> List of subjects </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#coordinator" data-toggle="collapse" aria-expanded="false"
                            class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-terminal">
                                    <polyline points="4 17 10 11 4 5"></polyline>
                                    <line x1="12" y1="19" x2="20" y2="19"></line>
                                </svg>
                                <span>DISTRICT COORDINATOR</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-right">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="coordinator"
                            data-parent="#accordionExample">
                            <li>
                                <a href="districtsub.html"> List of Subjects </a>
                            </li>
                            <li>
                                <a href="districtcaseanm.html"> Expired samples </a>
                            </li>
                            <li>
                                <a href="districtcasesheet.html"> PNDT Counselling </a>
                            </li>
                        </ul>
                    </li>
                </ul>


            </nav>

        </div>
        <!--  END SIDEBAR  -->
        <!--  BEGIN SIDEBAR  -->
        <div class="sidebar-wrapper sidebar-theme">

            <nav id="sidebar">
                <div class="shadow-bottom"></div>

                <ul class="list-unstyled menu-categories" id="accordionExample">
                    <li class="menu">
                        <a href="dashboard.html" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                <span>Dashboard</span>
                            </div>
                        </a>
                    </li>
                    <li class="menu">
                        <a href="#anm" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                                <span>ANM / PHC</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="anm" data-parent="#accordionExample">
                            <li>
                                <a href="notification.html"> ANM Notifications </a>
                            </li>
                            <li>
                                <a href="live-screener-entry.html"> Subject Registration </a>
                            </li>
                            <li>
                                <a href="collection.html"> Sample Collection </a>
                            </li>
                            <li>
                                <a href="Completed.html">  ANM Pick and Pack list </a>
                            </li>
                            <li>
                                <a href="shipmentlog.html"> ANM Shipment log  </a>
                            </li>
                            <li>
                                <a href="profile.html"> Subject Profile </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#chc" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle">
                            <div class="">
                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M98.5216,14.0008c-32.7972,0 -59.4776,26.6804 -59.4776,59.4776c0,32.7972 26.6804,59.4776 59.4776,59.4776c32.7972,0 59.4776,-26.6804 59.4776,-59.4776c0,-32.7972 -26.6804,-59.4776 -59.4776,-59.4776zM35.55898,54.64097c-5.69107,9.11886 -9.03658,19.84228 -9.03658,31.35903c0,32.7972 26.6804,59.4776 59.4776,59.4776c11.51674,0 22.24017,-3.34552 31.35903,-9.03659c-5.9728,1.78433 -12.2855,2.77579 -18.83743,2.77579c-36.30638,0 -65.7384,-29.43202 -65.7384,-65.7384c0,-6.55193 0.99146,-12.86462 2.77578,-18.83743zM98.5216,54.696c10.37415,0 18.7824,8.40825 18.7824,18.7824c0,10.37415 -8.40825,18.7824 -18.7824,18.7824c-10.37415,0 -18.7824,-8.40825 -18.7824,-18.7824c0,-10.37415 8.40825,-18.7824 18.7824,-18.7824zM23.03738,67.16257c-5.69107,9.11886 -9.03658,19.84228 -9.03658,31.35903c0,32.7972 26.6804,59.4776 59.4776,59.4776c11.51674,0 22.24017,-3.34552 31.35903,-9.03659c-5.9728,1.78433 -12.2855,2.77579 -18.83743,2.77579c-36.30638,0 -65.7384,-29.43202 -65.7384,-65.7384c0,-6.55193 0.99146,-12.86462 2.77578,-18.83743zM98.5216,67.2176c-3.45774,0 -6.2608,2.80306 -6.2608,6.2608c0,3.45774 2.80306,6.2608 6.2608,6.2608c3.45774,0 6.2608,-2.80306 6.2608,-6.2608c0,-3.45774 -2.80306,-6.2608 -6.2608,-6.2608z"></path></g><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="none"></path><path d="M86,168.56c-45.59663,0 -82.56,-36.96337 -82.56,-82.56v0c0,-45.59663 36.96337,-82.56 82.56,-82.56v0c45.59663,0 82.56,36.96337 82.56,82.56v0c0,45.59663 -36.96337,82.56 -82.56,82.56z" fill="none"></path></g></svg>
                                <span>CHC (CBC & SST)</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse show" id="chc" data-parent="#accordionExample"
                            style="">
                           
                            <li>
                                <a href="#chc-couonsellor" data-toggle="collapse" data-active="true" aria-expanded="false" class="dropdown-toggle"> CHC-Regn & Sampling <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu show" id="chc-couonsellor" data-parent="#chc"> 
                                    <li>
                                        <a href="chc-notification.html">CHC Notifications </a>
                                    </li>
                                    <li>
                                        <a href="chcregistration.html"> Subject Registration </a>
                                    </li>
                                    <li>
                                        <a href="chccollection.html"> Sample Collection </a>
                                    </li>
                                    <li>
                                        <a href="samplepick.html"> Sample Pick & Pack </a>
                                    </li>
                                    <li>
                                        <a href="cbcshipment.html"> Shipment for CBC/SST</a>
                                    </li>
                                    <li>
                                        <a href="subjectprofile.html"> Subject Profile </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#chc-obstetrician" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"> CHC-Sample Rec & Processing <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu" id="chc-obstetrician" data-parent="#chc"> 
                                    <li>
                                        <a href="deliveryconfirm.html"> Confirm Sample Receipt </a>
                                    </li>
                                    <li>
                                        <a href="receivedmanual.html"> Manual Sample Receipt </a>
                                    </li>
                                    <li>
                                        <a href="samplelist.html"> Update CBC Results </a>
                                    </li>
                                    <li>
                                        <a href="testresults.html"> Update SST Results </a>
                                    </li>
                                    <li class="active">
                                        <a href="pickandpack.html"> CHC Pick & Pack </a>
                                    </li>
                                    <li>
                                        <a href="chcshipmentlog.html"> CHC Shipment Log </a>
                                    </li>
                                    <li>
                                        <a href="chcpositivecases.html"> Report of all Samples </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#centrallab" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M67.80416,28.38003c-1.28887,0 -2.43629,0.81554 -2.86086,2.03163c-0.42457,1.21608 -0.03545,2.56963 0.97139,3.37025c2.36242,1.88326 3.97592,4.23701 4.9221,7.18473v50.15685l-29.59183,43.0432c-1.27371,1.85294 -1.41638,4.23881 -0.37316,6.22519c1.04626,1.99244 3.09835,3.22809 5.34856,3.22809h79.55915c2.25021,0 4.29941,-1.23869 5.34264,-3.22809c1.04626,-1.98637 0.90647,-4.37225 -0.36723,-6.22519l-29.59183,-43.0432v-50.42932c0.39727,-3.16 1.76769,-5.20044 4.43641,-6.59242c1.23731,-0.64595 1.87649,-2.05612 1.54593,-3.41171c-0.33662,-1.35862 -1.55166,-2.31001 -2.94971,-2.31001zM74.48542,34.44529h22.34788c-0.90069,1.67098 -1.46917,3.58068 -1.71178,5.72172c-0.01516,0.11524 -0.02369,0.2283 -0.02369,0.34354v51.55471c0,0.61259 0.18736,1.21428 0.53308,1.7177l7.16103,10.41282h-33.584l7.16103,-10.41282c0.34269,-0.50342 0.53308,-1.10511 0.53308,-1.7177v-51.55471c0,-0.29113 -0.04251,-0.57985 -0.12439,-0.85885c-0.55497,-1.88023 -1.3218,-3.61731 -2.29224,-5.20641zM28.37998,52.64107c-1.67704,0 -3.03263,1.35862 -3.03263,3.03263v16.17008c-9.20706,4.24871 -15.09037,13.15299 -15.16315,23.23042c-0.05459,7.35413 2.76358,14.25412 7.92511,19.42778c5.08875,5.09179 11.9062,7.88957 19.20271,7.88957h0.16585h3.03263c0.16679,0.00607 0.39391,0.01185 0.64562,0.01185l23.28372,-33.29969c-1.45263,-8.21236 -8.05367,-14.65466 -14.82553,-17.39616v-16.03384c0,-1.67401 -1.35559,-3.03263 -3.03263,-3.03263zM113.29361,52.64107c-1.67704,0 -3.03263,1.35862 -3.03263,3.03263v23.75165c-0.05413,0.3275 -0.05413,0.66166 0,0.98916v13.61129l19.8424,28.36575h1.38601h21.22841c1.67704,0 3.03263,-1.35862 3.03263,-3.03263v-38.9148c0.05413,-0.3275 0.05413,-0.66166 0,-0.98916v-14.59453c0.07582,-2.55044 1.90904,-5.26725 4.35941,-6.46211c1.26764,-0.61866 1.94425,-2.02897 1.62885,-3.40579c-0.31843,-1.37681 -1.54242,-2.35147 -2.95563,-2.35147zM31.41261,58.70633h12.13052v15.16315c0,1.35559 0.89937,2.54708 2.20339,2.92009c3.33836,0.94986 6.73274,3.18745 9.21043,6.1778h-34.37178c2.22115,-2.73754 5.22173,-4.91199 8.84912,-6.2548c1.18576,-0.44276 1.97832,-1.57545 1.97832,-2.84309zM116.32624,58.70633h35.08255c-1.04019,1.859 -1.65994,3.94545 -1.72362,6.06526v12.13052h-33.35893z"></path></g></g></svg>
                                <span>CENTRAL LAB (HPLC TEST)</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="centrallab" data-parent="#accordionExample" style="">
                            <li>
                                <a href="centraldelivery.html"> Confirm sample received at Central Lab </a>
                            </li>
                            <li>
                                <a href="centralsample.html"> Update HPLC test results </a>
                            </li>
                            <li>
                                <a href="centralpickpack.html"> Central Pick & Pack </a>
                            </li>
                            <li>
                                <a href="centralshipmentlog.html"> Central Shipment log </a>
                            </li>
                            <li>
                                <a href="centralpositive.html"> Report of all samples  </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#molecularlab" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                                <div class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M110.9252,20.59097c-2.39834,0 -4.79664,0.90823 -6.60848,2.72006c-2.98793,2.98793 -3.4669,7.55174 -1.52737,11.09932l-78.77235,78.77234c-8.73614,8.73614 -8.73614,22.94927 0,31.68541c4.36807,4.36807 10.10681,6.54763 15.84575,6.54763c5.73894,0 11.47159,-2.17644 15.83966,-6.54763l78.76626,-78.76626c1.40095,0.77229 2.94515,1.20486 4.49693,1.20486c2.38626,0 4.79679,-0.92663 6.60848,-2.73832c3.62367,-3.62367 3.62367,-9.59329 0,-13.21696l-28.0404,-28.0404c-1.81184,-1.81184 -4.21014,-2.72006 -6.60848,-2.72006zM110.9252,26.78566c0.79069,0 1.58138,0.30958 2.20283,0.93103l28.0404,28.0404c1.2429,1.2429 1.2429,3.16275 0,4.40565c-0.62471,0.62471 -1.39871,0.91277 -2.20283,0.91277c-0.80412,0 -1.57812,-0.28807 -2.20283,-0.91277l-0.37728,-0.37728l-13.01615,-13.01615l-4.40565,4.40565l10.81332,10.81332l-11.55571,11.54963h-45.7482l34.42373,-34.42981l3.24947,3.24947l4.41174,-4.40565l-5.45839,-5.4523l-0.37728,-0.37728c-1.2429,-1.2429 -1.2429,-3.16276 0,-4.40565c0.62145,-0.62145 1.41214,-0.93103 2.20283,-0.93103zM138.9656,92.2802c-0.87159,0 -1.74318,0.3342 -2.3367,1.00405c-1.35529,1.53599 -13.2413,15.27058 -13.2413,24.49275c0,8.58971 6.98829,15.578 15.578,15.578c8.58971,0 15.578,-6.98829 15.578,-15.578c0,-9.22218 -11.88601,-22.95676 -13.2413,-24.49275c-0.59352,-0.66985 -1.46511,-1.00405 -2.3367,-1.00405z"></path></g></g></svg>
                                    <span>MOLECULAR LAB
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="molecularlab" data-parent="#accordionExample">
                            <li>
                                <a href="geneticlabdelivery.html"> Confirm sample received </a>
                            </li>
                            <li>
                                <a href="geneticlabsamplelist.html"> Sample received at molecular lab </a>
                            </li>
                            <li>
                                <a href="genetictestresults.html"> Update molecular test results </a>
                            </li>
                            
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#pndtc" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M70.51503,26.66507c0,-8.63306 7.00672,-15.63977 15.63977,-15.63977c8.63306,0 15.63977,7.00671 15.63977,15.63977c0,8.63305 -7.00671,15.63977 -15.63977,15.63977c-8.63305,0 -15.63977,-7.00672 -15.63977,-15.63977zM154.97469,123.64633v33.46838c0,3.90077 -3.28936,7.20236 -7.19014,7.20236h-4.37767c-3.58284,0 -6.6521,-2.78801 -7.129,-6.2608h-0.07337c0,-1.72416 -1.394,-3.1304 -3.1304,-3.1304h-15.68868l-0.30571,1.77308c-0.81928,4.54886 -4.57332,7.71595 -9.10995,7.71595c-0.56249,0 -1.13721,-0.06114 -1.72416,-0.15896c-2.48231,-0.45244 -4.63446,-1.80976 -6.0407,-3.83963c-1.12499,-1.61411 -1.66302,-3.5217 -1.61411,-5.49043h-25.17771c0.06114,1.88313 -0.46467,3.83963 -1.62634,5.49043c-1.40623,2.02987 -3.54615,3.38719 -6.02846,3.83963c-5.24586,0.95379 -9.90478,-2.4334 -10.83412,-7.5203l-0.30571,-1.80976h-12.26481c-1.72417,0 -3.11817,1.40624 -3.11817,3.1304h-0.07337c-0.47689,3.47279 -3.54615,6.2608 -7.12899,6.2608h-4.37767c-3.90077,0 -7.19014,-3.30159 -7.19014,-7.20236v-33.46838c0,-8.63306 7.00671,-15.63977 15.63977,-15.63977h11.46998c0.12228,-0.41576 0.26902,-0.83151 0.44021,-1.22281c0.0856,0.07337 0.15897,0.15896 0.24456,0.23234l0.52581,0.45244l0.61141,0.31793c3.3505,1.7364 5.99178,2.75133 8.8287,3.39942l26.93856,5.49043c1.01494,0.26902 2.06655,0.40353 3.11817,0.40353c2.27443,0 4.43881,-0.63586 6.29748,-1.77308l6.79884,-1.30841l9.15887,-1.76085c3.85186,-0.83151 8.70643,-2.49454 8.90208,-2.55568l0.46467,-0.15896l0.42799,-0.23234c0.7826,-0.41575 1.50406,-0.85597 2.18884,-1.35732c0.08559,0.11006 0.14674,0.23234 0.2201,0.34239c0.3913,-0.17119 0.81929,-0.26902 1.27172,-0.26902h15.32184c8.62083,0 15.63977,7.00671 15.63977,15.63977zM53.55462,148.66507l-5.80836,-34.40994h-11.64118c-5.1725,0 -9.3912,4.2187 -9.3912,9.3912v33.46838c0,0.46467 0.4769,0.94156 0.94156,0.94156h4.37767c0.46467,0 0.94156,-0.4769 0.94156,-0.94156h0.04891c0.46467,-4.73229 4.47549,-8.44964 9.33006,-8.44964zM70.14819,122.90041l2.6535,25.76466h26.37606l2.38449,-24.9576l-15.49304,-4.65891zM148.72611,123.64633c0,-5.1725 -4.2187,-9.3912 -9.3912,-9.3912h-15.01614c-0.03668,0.20788 -0.01223,0.3913 -0.04891,0.6114l-5.80836,33.79854h14.61261c4.8668,0 8.86539,3.71735 9.34229,8.44964h0.04891c0,0.46467 0.4769,0.94156 0.94157,0.94156h4.37767c0.46467,0 0.94156,-0.4769 0.94156,-0.94156zM52.2829,102.23488c2.54345,1.32064 4.79343,2.27443 7.32464,2.84915l27.03639,5.50266c0.53804,0.17119 1.0883,0.24456 1.63857,0.24456c2.60459,0 5.0869,-1.77308 5.8695,-4.62223l0.11005,-0.44021c0.57472,-3.38719 -1.57743,-6.39531 -4.61,-7.03117c-4.12088,-0.92934 -22.65872,-5.20918 -22.65872,-5.20918c-1.63857,-0.37907 -2.67796,-1.96873 -2.37225,-3.61953l2.18884,-11.88574c0.31793,-1.69971 1.93204,-2.8247 3.64398,-2.50676c1.69971,0.3057 2.8247,1.94427 2.50676,3.64398l-1.63857,8.93876c4.42658,1.02716 12.80285,2.9592 17.36394,3.9986l12.69279,-2.98366l-2.59236,-9.70913c-0.45244,-1.67525 0.53804,-3.38719 2.20106,-3.83963c1.67526,-0.44021 3.38719,0.53804 3.83963,2.21329l3.4361,12.8273c0.22011,0.81929 0.09783,1.69971 -0.33016,2.40894c-0.42798,0.73369 -1.13721,1.24727 -1.96873,1.44292l-8.44964,1.99319c0.24456,0.28124 0.48913,0.55026 0.70923,0.84374c2.00541,2.7391 2.80024,6.11406 2.23775,9.51348l-0.04891,0.28125l-0.07337,0.28125l-0.13451,0.48913l9.14664,-1.76085c3.39942,-0.73369 8.05834,-2.33557 8.05834,-2.33557c1.84645,-0.97825 3.31382,-2.22552 4.27985,-3.81517c1.55297,-2.50676 1.88313,-5.53934 1.0027,-8.85316c-1.18613,-5.62494 -6.28525,-27.64779 -7.93605,-32.63686c-2.24998,-6.28526 -7.20236,-9.89255 -13.58545,-9.89255h-30.65591c-4.46326,0 -10.3939,1.71194 -13.26751,9.88032c-0.57472,1.57743 -1.45515,5.41706 -2.9592,12.05693c-1.62634,7.14123 -3.64398,16.0433 -5.22141,20.93455c-0.84374,2.75133 -0.52581,5.63716 0.89265,8.10725c0.59918,1.03939 1.40624,1.91981 2.32335,2.69019z"></path></g></g></svg>
                                <span>PNDTC</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="pndtc" data-parent="#accordionExample"
                            style="">
                           
                            <li>
                                <a href="#pndtc-couonsellor" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"> Counsellor <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu" id="pndtc-couonsellor" data-parent="#pndtc"> 
                                    <li>
                                        <a href="counsellorschedule.html"> Counselling Scheduler </a>
                                    </li>
                                    <li>
                                        <a href="counsellorsubjectlist.html"> Pre test counselling </a>
                                    </li>
                                    <li>
                                        <a href="Post-test-counselling.html"> Post test counselling </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#pndtc-obstetrician" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle"> Lab Obstetrician <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                                    stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg> </a>
                                <ul class="collapse list-unstyled sub-submenu" id="pndtc-obstetrician" data-parent="#pndtc"> 
                                    <li>
                                        <a href="obspndtc.html"> PND </a>
                                    </li>
                                    <li>
                                        <a href="obsmtp.html"> MTP </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#pathologist" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 172 172"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="M86,172c-47.49649,0 -86,-38.50351 -86,-86v0c0,-47.49649 38.50351,-86 86,-86v0c47.49649,0 86,38.50351 86,86v0c0,47.49649 -38.50351,86 -86,86z" fill="#ffffff"></path><g fill="#506690"><path d="M30.7364,14.3104v143.9984h84.63697c5.22449,3.90961 11.67721,6.2608 18.66623,6.2608c17.2172,0 31.304,-14.0868 31.304,-31.304c0,-13.94748 -9.24861,-25.83462 -21.9128,-29.84885v-49.70733l-39.39902,-39.39902zM105.866,24.99778l26.87742,26.87742h-26.87742zM130.9092,108.4425v24.8231c0.00017,1.7288 1.4016,3.13023 3.1304,3.1304h24.8231c-1.55623,12.30674 -12.11171,21.9128 -24.8231,21.9128c-13.77376,0 -25.0432,-11.26944 -25.0432,-25.0432c0,-12.71138 9.60606,-23.26687 21.9128,-24.8231zM137.17,108.4425c11.27818,1.42616 20.26653,10.41451 21.6927,21.6927h-21.6927z"></path></g></g></svg>
                                <span>PATHOLOGIST</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="pathologist" data-parent="#accordionExample"
                            style="">
                            <li>
                                <a href="pathosubject.html"> List of subjects </a>
                            </li>
                            <li>
                                <a href="pathoreport.html"> Report </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#birthmonitoring" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                                <span>BIRTH MONITORING</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="birthmonitoring" data-parent="#accordionExample" style="">
                            <li>
                                <a href="infantregistration.html"> Infant registration </a>
                            </li>
                            <li>
                                <a href="infantcollection.html"> Infant collection </a>
                            </li>
                            <li>
                                <a href="infantpickpack.html"> Pick and Pack </a>
                            </li>
                            <li>
                                <a href="infantprofile.html"> Infant profile </a>
                            </li>
                            <li>
                                <a href="sentinelpending.html"> List of subjects </a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu">
                        <a href="#coordinator" data-toggle="collapse" aria-expanded="false"
                            class="dropdown-toggle">
                            <div class="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-terminal">
                                    <polyline points="4 17 10 11 4 5"></polyline>
                                    <line x1="12" y1="19" x2="20" y2="19"></line>
                                </svg>
                                <span>DISTRICT COORDINATOR</span>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="feather feather-chevron-right">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </a>
                        <ul class="submenu list-unstyled collapse" id="coordinator"
                            data-parent="#accordionExample">
                            <li>
                                <a href="districtsub.html"> List of Subjects </a>
                            </li>
                            <li>
                                <a href="districtcaseanm.html"> Expired samples </a>
                            </li>
                            <li>
                                <a href="districtcasesheet.html"> PNDT Counselling </a>
                            </li>
                        </ul>
                    </li>
                </ul>


            </nav>

        </div>
        <!--  END SIDEBAR  -->
`);