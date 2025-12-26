import React, { useState } from 'react';
import { Contact, Message } from '../types';
import { ArrowLeft, Send, Video, Phone, ShieldAlert, MoreVertical, Image, Mic, Smile, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface MessageViewProps {
  contacts: Contact[];
  onBack: () => void;
}

export const MessageView: React.FC<MessageViewProps> = ({ contacts, onBack }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      { id: 'm1', senderId: '1', text: 'Have you finished your homework?', timestamp: new Date(Date.now() - 3600000), isIncoming: true },
    ],
    '2': [
      { id: 'm2', senderId: '2', text: 'Practice is at 5pm today champ!', timestamp: new Date(Date.now() - 7200000), isIncoming: true },
      { id: 'm3', senderId: 'me', text: 'I know dad, I am ready!', timestamp: new Date(Date.now() - 7100000), isIncoming: false }
    ]
  });
  const [inputText, setInputText] = useState('');
  const [blockedAttempt, setBlockedAttempt] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedContact) return;
    
    // Simulation: AI Safety Scan
    const badWords = ['hate', 'kill', 'stupid', 'idiot'];
    if (badWords.some(w => inputText.toLowerCase().includes(w))) {
        setBlockedAttempt(true);
        setTimeout(() => setBlockedAttempt(false), 3000);
        return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date(),
      isIncoming: false
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));
    setInputText('');
  };

  if (selectedContact) {
    const chat = messages[selectedContact.id] || [];
    
    return (
      <div className="flex flex-col h-full bg-[#FFFFFF] z-30 font-sans">
        {/* Chat Header - Material Style with Safe Area */}
        <div className="h-20 pt-8 flex items-center justify-between px-2 bg-white sticky top-0 z-10 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <button onClick={() => setSelectedContact(null)} className="p-2 rounded-full hover:bg-slate-100">
               <ArrowLeft size={24} className="text-[#1f1f1f]" />
            </button>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
                   <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-lg font-normal text-[#1f1f1f]">{selectedContact.name}</span>
            </div>
          </div>
          <div className="flex gap-4 text-[#444746] pr-4">
             <Video size={24} />
             <Phone size={24} />
             <MoreVertical size={24} />
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1 bg-white">
           <div className="text-center py-6">
              <span className="text-xs font-medium text-[#444746]">Today {new Date().toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</span>
           </div>

           {chat.map((msg, idx) => {
             return (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 key={msg.id} 
                 className={`flex w-full ${msg.isIncoming ? 'justify-start' : 'justify-end'}`}
               >
                 <div className={`max-w-[75%] px-5 py-3 text-[16px] leading-snug relative shadow-sm ${
                   msg.isIncoming 
                     ? 'bg-[#F2F2F2] text-[#1f1f1f] rounded-[24px] rounded-tl-[4px]' 
                     : 'bg-[#00639B] text-white rounded-[24px] rounded-tr-[4px]'
                 }`}>
                   {msg.text}
                 </div>
               </motion.div>
             );
           })}
           
           {blockedAttempt && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center my-4">
               <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-red-100 shadow-sm">
                 <ShieldAlert size={14} />
                 <span>Message blocked by Safety Shield.</span>
               </div>
             </motion.div>
           )}
           <div className="h-20"></div>
        </div>

        {/* Input Area - Pill Style */}
        <div className="absolute bottom-6 left-4 right-4 bg-[#F2F2F2] rounded-full px-2 py-2 flex items-center gap-2 z-20 shadow-sm">
           <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#444746] hover:bg-slate-200">
              <Smile size={24} />
           </div>
           <input 
             type="text" 
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder="Text message"
             className="flex-1 bg-transparent text-[16px] focus:outline-none placeholder:text-[#444746] px-2 text-[#1f1f1f]"
             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
           />
           <div className="flex items-center gap-1">
               <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#444746] hover:bg-slate-200">
                 <Image size={24} />
               </div>
               {inputText.trim() ? (
                   <button 
                     onClick={handleSendMessage}
                     className="w-10 h-10 rounded-full bg-[#00639B] flex items-center justify-center text-white transition-all transform active:scale-90"
                   >
                     <Send size={20} className="ml-0.5" />
                   </button>
               ) : (
                   <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#444746] hover:bg-slate-200">
                     <Mic size={24} />
                   </div>
               )}
           </div>
        </div>
      </div>
    );
  }

  // Conversation List View
  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Header with Safe Area */}
      <div className="pt-16 px-4 pb-4 bg-white z-10 sticky top-0">
        <div className="bg-[#F0F4F8] rounded-full h-12 flex items-center px-4 gap-3 text-[#444746]">
            <Search size={20} />
            <span className="text-base flex-1">Search conversations</span>
            <div className="w-7 h-7 bg-[#C2E7FF] rounded-full flex items-center justify-center text-xs font-bold text-[#001D35]">A</div>
        </div>
        <h2 className="text-3xl font-normal text-[#1f1f1f] mt-6 ml-2">Messages</h2>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-2 pb-24">
        <div className="space-y-1">
          {contacts.map((contact, i) => (
            <div 
              key={contact.id} 
              onClick={() => setSelectedContact(contact)}
              className="flex items-center gap-4 py-3 px-3 active:bg-[#f2f2f2] rounded-2xl transition-colors cursor-pointer"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden">
                  <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-semibold text-lg text-[#1f1f1f] truncate">{contact.name}</h3>
                    <span className="text-xs text-[#444746] font-medium">
                       {messages[contact.id]?.slice(-1)[0] ? '12:30 PM' : ''}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <p className={`text-sm truncate leading-snug w-full ${messages[contact.id]?.slice(-1)[0]?.isIncoming ? 'font-bold text-[#1f1f1f]' : 'text-[#444746] font-normal'}`}>
                      {messages[contact.id]?.slice(-1)[0]?.text || "Start chat"}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-24 right-6">
         <button className="w-16 h-16 bg-[#C2E7FF] rounded-[20px] shadow-lg flex items-center justify-center text-[#001D35] hover:shadow-xl transition-shadow active:scale-95">
            <MessageSquare size={28} fill="currentColor" className="text-[#001D35]" />
         </button>
      </div>
    </div>
  );
};

const Search = ({size, className}: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);