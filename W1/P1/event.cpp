/***********************************************************************
// OOP345 Workshop #1 (part 1):
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
	//Global variables
	size_t g_sysClock = 0u;   
	size_t index = 0;

	Event::Event() {
		//Initializing description to an empty string and time to zero
		desc[0] = '\0';
		time = 0;
	}
	//Print event information
	void Event::display() const
	{
		if (desc[0] != '\0')
		{   //Print formatted event information if the description is not empty
			cout << setw(2) << setfill(' ') << index + 1 << ". " << setw(2) << setfill('0') << time / 3600 << ":" << setw(2) << (time / 60) % 60 << ":" << setw(2) << time % 60 << " => " << desc << endl;
		}
		else
		{  //Print if no event description is available
			cout << setw(2) << setfill(' ') << index + 1 << ". | No Event |" << endl;
		}
		index++;
	}
	//Update event information
	void Event::set(char* ch) {
		if (ch != nullptr && ch[0] != '\0') {
			strcpy(desc, ch);  //copy
			time = g_sysClock;
		}
		else {
			desc[0] = '\0';   //set to empty
		}
	}
}