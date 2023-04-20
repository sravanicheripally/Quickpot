import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

function Accordion() {
    const[show,setShow]=useState(false)
    const[clip,setClip]=useState("copied to clipboard")
    const trigering=()=>{
        setShow(!show)
    }
    return (
        
            <main id="main" class="main">

                <section class="section col-9 justify-content-between">
                    <div class="row pt-2 ps-lg-2">
                        <div class="d-md-flex align-items-center justify-content-between">
                            {/* <a class="btn btn-sm btn-bd-light mb-3 mb-md-0 rounded-2" href="https://github.com/twbs/bootstrap/blob/main/site/content/docs/5.2/components/accordion.md" title="View and edit this file on GitHub" target="_blank" rel="noopener">
                                View on GitHub
                            </a> */}
                            <h1 class="py-3 mb-0" id="content">Accordion</h1>
                        </div>
                        <p class="lead">Build vertically collapsing accordions in combination with our Collapse JavaScript plugin.</p>
                        <script async="" src="https://cdn.carbonads.com/carbon.js?serve=CKYIKKJL&amp;placement=getbootstrapcom" id="_carbonads_js"></script>

                    </div>
                    <div class="row pt-2 ps-lg-2">
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Accordion Item #1
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                            
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Accordion Item #2
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Accordion Item #3
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="d-flex align-items-center highlight-toolbar bg-light ps-3 pe-2 py-1" style={{position:'relative',top:'48px',left:'10px'}}>
                            <small class="font-monospace text-muted text-uppercase">html</small>
                            <div class="d-flex ms-auto">
                                 {show?
                                 <span>{clip}
                                    <button type="button" class="btn-clipboard mt-0 me-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Copy to Clipboard" onClick={trigering}>
                                    <i class="bi bi-clipboard"></i>
                                </button>
                                 </span>: <CopyToClipboard>
                                <button type="button" class="btn-clipboard mt-0 me-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Copy to Clipboard" onClick={trigering}>
                                    <i class="bi bi-clipboard"></i>
                                </button>
                                </CopyToClipboard>}
                            </div>
                        </div>
                        <div class="highlight" style={{color:'#ff0',background:'#000',padding:'20px',margin:'10px'}}>
                            <pre>
                            <xmp id="clipCode1"> 
                           {`
                                    <div class="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingOne">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Accordion Item #1
                                                </button>
                                            </h2>
                                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    Accordion Item #1 description.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingTwo">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Accordion Item #2
                                                </button>
                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    Accordion Item #2 description.
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingThree">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Accordion Item #3
                                                </button>
                                            </h2>
                                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    Accordion Item #3 description.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    `}
                           </xmp>
                            </pre>
                        </div>

                    </div>

                </section>
            </main>
       
    )
}

export default Accordion