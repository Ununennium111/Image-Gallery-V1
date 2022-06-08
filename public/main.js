class Header extends HTMLElement {
    connectedCallback() {
        if (!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')) {
            this.innerHTML = `
                <header>
                    <nav class="bg-purple-600">
                        <div class="relative container mx-auto p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h1 class="text-3xl text-slate-200">Image Gallery</h1>
                                </div>
                
                                <div class="flex space-x-6">
                                    <a href="./login.html" class="text-lg text-slate-200 hover:text-slate-300">Sign In</a>
                                    <a href="./register.html" class="text-lg text-slate-200 hover:text-slate-300">Sign Up</a>
                                </div>
                            </div>
                        </div>
                    </nav>    
                </header>
            `
        }
        else {
            this.innerHTML = `
            <header>
                <nav class="bg-purple-600">
                    <div class="relative container mx-auto p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-3xl text-slate-200">Image Gallery</h1>
                            </div>
            
                            <div class="flex space-x-6">
                                <a href="./index.html" class="text-lg text-slate-200 hover:text-slate-300">My Images</a>
                                <a href="./upload.html" class="text-lg text-slate-200 hover:text-slate-300">Upload</a>
                            </div>
                        </div>
                    </div>
                </nav>    
            </header>
            `
        }
    }
}

customElements.define('custom-header', Header);