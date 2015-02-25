<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Cards
 *
 * @ORM\Table(name="cards", uniqueConstraints={@ORM\UniqueConstraint(name="id_UNIQUE", columns={"id"})}, indexes={@ORM\Index(name="fk_Cards_airline1_idx", columns={"airline_id"}), @ORM\Index(name="fk_Cards_businesspartner1_idx", columns={"businesspartner_id"})})
 * @ORM\Entity
 */
class Cards
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="card_number", type="string", length=45, nullable=false)
     */
    private $cardNumber;

    /**
     * @var string
     *
     * @ORM\Column(name="access_password", type="string", length=45, nullable=true)
     */
    private $accessPassword;

    /**
     * @var string
     *
     * @ORM\Column(name="access_id", type="string", length=45, nullable=true)
     */
    private $accessId;

    /**
     * @var string
     *
     * @ORM\Column(name="recovery_password", type="string", length=45, nullable=false)
     */
    private $recoveryPassword;

    /**
     * @var \Airline
     *
     * @ORM\ManyToOne(targetEntity="Airline")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="airline_id", referencedColumnName="id")
     * })
     */
    private $airline;

    /**
     * @var \Businesspartner
     *
     * @ORM\ManyToOne(targetEntity="Businesspartner")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="businesspartner_id", referencedColumnName="id")
     * })
     */
    private $businesspartner;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set cardNumber
     *
     * @param string $cardNumber
     * @return Cards
     */
    public function setCardNumber($cardNumber)
    {
        $this->cardNumber = $cardNumber;
    
        return $this;
    }

    /**
     * Get cardNumber
     *
     * @return string 
     */
    public function getCardNumber()
    {
        return $this->cardNumber;
    }

    /**
     * Set accessPassword
     *
     * @param string $accessPassword
     * @return Cards
     */
    public function setAccessPassword($accessPassword)
    {
        $this->accessPassword = $accessPassword;
    
        return $this;
    }

    /**
     * Get accessPassword
     *
     * @return string 
     */
    public function getAccessPassword()
    {
        return $this->accessPassword;
    }

    /**
     * Set accessId
     *
     * @param string $accessId
     * @return Cards
     */
    public function setAccessId($accessId)
    {
        $this->accessId = $accessId;
    
        return $this;
    }

    /**
     * Get accessId
     *
     * @return string 
     */
    public function getAccessId()
    {
        return $this->accessId;
    }

    /**
     * Set recoveryPassword
     *
     * @param string $recoveryPassword
     * @return Cards
     */
    public function setRecoveryPassword($recoveryPassword)
    {
        $this->recoveryPassword = $recoveryPassword;
    
        return $this;
    }

    /**
     * Get recoveryPassword
     *
     * @return string 
     */
    public function getRecoveryPassword()
    {
        return $this->recoveryPassword;
    }

    /**
     * Set airline
     *
     * @param \Airline $airline
     * @return Cards
     */
    public function setAirline(\Airline $airline = null)
    {
        $this->airline = $airline;
    
        return $this;
    }

    /**
     * Get airline
     *
     * @return \Airline 
     */
    public function getAirline()
    {
        return $this->airline;
    }

    /**
     * Set businesspartner
     *
     * @param \Businesspartner $businesspartner
     * @return Cards
     */
    public function setBusinesspartner(\Businesspartner $businesspartner = null)
    {
        $this->businesspartner = $businesspartner;
    
        return $this;
    }

    /**
     * Get businesspartner
     *
     * @return \Businesspartner 
     */
    public function getBusinesspartner()
    {
        return $this->businesspartner;
    }
}
