import React from 'react'


    export default function Footer() {
      return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <nav>
              <h6 className="footer-title text-lg font-semibold mb-4">Services</h6>
              <a className="link link-hover block mb-2">Branding</a>
              <a className="link link-hover block mb-2">Design</a>
              <a className="link link-hover block mb-2">Marketing</a>
              <a className="link link-hover block mb-2">Advertisement</a>
            </nav>
            <nav>
              <h6 className="footer-title text-lg font-semibold mb-4">Company</h6>
              <a className="link link-hover block mb-2">About us</a>
              <a className="link link-hover block mb-2">Contact</a>
              <a className="link link-hover block mb-2">Jobs</a>
            </nav>
            <nav>
              <h6 className="footer-title text-lg font-semibold mb-4">Legal</h6>
              <a className="link link-hover block mb-2">Terms of use</a>
              <a className="link link-hover block mb-2">Privacy policy</a>
              <a className="link link-hover block mb-2">Cookie policy</a>
            </nav>
          </div>
        </footer>
      );
    }

 