/***********************************************************************
// OOP345 Workshop #1 (part 2):
//
// File  event.h
// Author  Nehmat Ladhar
// I have done all the coding by myself and only copied the code that my
// professor provided to complete my workshops and assignments.
// -----------------------------------------------------------
// Name  Nehmat Ladhar               Date  23 January 2024       email : nladhar@myseneca.ca
***********************************************************************/
#pragma once
#ifndef SENECA_EVENT_H
#define SENECA_EVENT_H

namespace seneca {
	extern size_t g_sysClock;       //global declaration of g_sysClock and index
	extern size_t index;

	class Event {
		char* desc;                 //C-style string to store the description
		size_t time;                //Variable to store the time

	public:
		Event();                    //Default constructor
		Event(const Event& src);    //Copy constructor
		virtual ~Event();           //Virtual destructor
		Event& operator=(const Event& copy);  //Copy Assignment operator
		void display() const;       //Display function to print event information
		void set(const char* ch = nullptr); //Set function to update event information with an optional description 
	};
}
#endif