#!/usr/bin/env bash

wget -O program-at-glance.pdf "https://docs.google.com/spreadsheets/d/1Mcgwl3mN0KkAWr9DJOVy9Nx-4iF2kqqEOk5yXK00meo/export?format=pdf"
pdfcrop program-at-glance.pdf program-at-glance.pdf
convert -density 200 program-at-glance.pdf program-at-glance.png

mv program-at-glance.pdf program-at-glance.png ../_assets/images/
