/***********************************************************************
// OOP345 Workshop #1 (part 2):
//
// File  event.cpp
// Author  Nehmat Ladhar
// I have done all the coding by myself and only copied the code that my
// professor provided to complete my workshops and assignments.
// -----------------------------------------------------------
// Name  Nehmat Ladhar               Date  23 January 2024       email : nladhar@myseneca.ca
***********************************************************************/
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <cstring>
#include <iomanip>
#include "event.h"

using namespace std;

namespace seneca {
	//Global Variables
	size_t g_sysClock = 0u;  
	size_t index = 0;

	//Default constructor
	Event::Event() {
		desc = nullptr;
		time = 0;
	}

	//Print event information
	void Event::display() const
	{
		if (desc != nullptr && desc[0] != '\0')   //Formatted information printed
		{
			cout << setw(2) << setfill(' ') << index + 1 << ". " << setw(2) << setfill('0') << time / 3600 << ":" << setw(2) << (time / 60) % 60 << ":" << setw(2) << time % 60 << " => " << desc << endl;
		}
		else    //No event description
		{
			cout << setw(2) << setfill(' ') << index + 1 << ". | No Event |" << endl;
		}
		index++;
	}

	//Copy Constructor
	Event::Event(const Event& src) {
		time = src.time;
		desc = new char[strlen(src.desc) + 1];
		strcpy(desc, src.desc);
	}

	//Destructor for event class
	Event::~Event() {
		delete[] desc;
	}

	//Copy assignment
	Event& Event::operator=(const Event& copy) {
		if (this != &copy) {
			delete[] desc;
			desc = new char[strlen(copy.desc) + 1];
			strcpy(desc, copy.desc);
			time = copy.time;
		}
		return *this;
	}

	//Update event information
	void Event::set(const char* ch) {
		if (ch != nullptr && ch[0] != '\0') {
			//Update time and allocate memory for the description
			time = g_sysClock;
			delete[] desc;
			desc = new char[strlen(ch) + 1];
			strcpy(desc, ch);
		}
		else {
			//Set an empty description if the input is null
			desc[0] = '\0';
		}
	}
}